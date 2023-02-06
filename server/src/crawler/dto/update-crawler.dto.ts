import { PartialType } from '@nestjs/mapped-types';
import { CreateCrawlerDto } from './create-crawler.dto';

export class UpdateCrawlerDto extends PartialType(CreateCrawlerDto) {}
