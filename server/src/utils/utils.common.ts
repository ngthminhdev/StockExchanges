export const getVal = (val: string): number => {
    if (!val) return 0;
    let multiplier = val.substr(-1).toLowerCase();
    if (!multiplier || !isNaN(+val)) return Math.round(parseFloat(val)) * 1000
    if (multiplier == "k")
        return Math.round(parseFloat(val)) * 1000;
    else if (multiplier == "m")
        return Math.round(parseFloat(val)) * 1000000;
}

export const convertToSlug = (str: string): string => {
    if (!str) return '';
    str = str.replace('Truyện tranh ', '');
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    let from = "àáạãảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ·/_,:;";
    let to   = "aaaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd------";
    for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
};



export const convertToNumber = (val: string) => {
    if (!val) return 0;
    return parseInt(`${val}0`.replace(/[,.]/g,'')) ;
}