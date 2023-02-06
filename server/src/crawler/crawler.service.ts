import {HttpStatus, Injectable} from '@nestjs/common';
import {NestCrawlerService} from "nest-crawler";
import {CatchException, ExceptionResponse} from "../utils/utils.exception";
import * as cheerio from 'cheerio'
import {HttpService} from "@nestjs/axios";
import {convertToNumber} from "../utils/utils.common";
import {InjectPage} from "nest-puppeteer";
import type {Page} from 'puppeteer';
import {InjectRepository} from "@nestjs/typeorm";
import {StockEntity} from "../stock/entities/stock.entity";
import {Repository} from "typeorm";

@Injectable()
export class CrawlerService {
    constructor(
        private readonly crawler: NestCrawlerService,
        private readonly http: HttpService,
        @InjectRepository(StockEntity)
        private readonly stock: Repository<StockEntity>,
        @InjectPage()
        private readonly page: Page
    ) {
    }

    async getHTML(url: string): Promise<string> {
        return await new Promise((resolve, reject) => {
            this.http.get(url, {headers: {"Accept-Encoding": "*"}}).subscribe((res) => {
                if (res.status === HttpStatus.OK) {
                    resolve(res.data);
                }
                reject(res.data);
            }, (err) => {
                console.log(err)
                reject(new ExceptionResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Server error', process.env.USER_SERVICE));
            })
        });
    }

    async getCraw(stock_exchanges: string): Promise<any> {
        try {
            await this.page.goto(`https://trade.vndirect.com.vn/chung-khoan/${stock_exchanges}`, {waitUntil: 'networkidle2'});
            const html = await this.page.content();

            let data: any = [];

            const $ = cheerio.load(html);
            $('#banggia-khop-lenh tbody tr').each(function () {
                const symbol = $(this).attr("id");
                const company_name = $(this).find('td:first-child').attr("data-tooltip").trim();
                const original_price = convertToNumber(($(this).find('td:nth-child(2) > span').text()));
                const highest_price = convertToNumber(($(this).find('td:nth-child(3) > span').text()));
                const lowest_price = convertToNumber(($(this).find('td:nth-child(4) > span').text()));
                const latest_price = convertToNumber(($(this).find('td:nth-child(4) > span').text()));
                const volume = convertToNumber(($(this).find('td:nth-child(5) > span:first-child > span').text()));
                const value = convertToNumber($(this).find('td:nth-child(5) > span:last-child > span').text());
                const buy = convertToNumber($(this).find('td:last-child > span:first-child > span:first-child').text());
                const sell = convertToNumber($(this).find('td:last-child > span:first-child > span:last-child').text());
                const residual = convertToNumber($(this).find('td:last-child > span:last-child > span').text());

                data.push({
                    stock_exchanges: stock_exchanges.toUpperCase(),
                    symbol, company_name, volume, value,
                    original_price, highest_price, lowest_price, latest_price,
                    foreign_investment: {
                        buy,
                        sell,
                        residual,
                    }
                })
            })

            for await (const item of data) {
                await this.stock.create({
                    stock_exchanges: item.stock_exchanges,
                    company_name: item.company_name,
                    symbol: item.symbol,
                    trading_volume: item.volume,
                    trading_value: item.value,
                    foreign_investment_buy: item.foreign_investment.buy,
                    foreign_investment_sell: item.foreign_investment.sell,
                    foreign_investment_residual: item.foreign_investment.residual,
                    original_price: item.original_price,
                    highest_price: item.highest_price,
                    lowest_price: item.lowest_price,
                }).save()
            }

            return data

        } catch (e) {
            throw new CatchException(e)
        }
    }
}
