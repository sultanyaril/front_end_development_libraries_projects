export function getRandomColor(){
    return "hsl(" + 360 * Math.random() + ',' +
        '50%,' +
        '65%)'
}

export const getRandomQuote = (data) => {
    const rand_quote_id = Math.floor(Math.random() * data.length);
    return {
        text: data[rand_quote_id]?.quote || "",
        author: data[rand_quote_id]?.author || "",
    }
}