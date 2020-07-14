
//Max amount per roll
const maximum = 100;
//Chance out of 100
const chance = 10;



export function getMoney(message, user) {

    let luck = Math.floor(Math.random() * 100);
    let winAmount = Math.floor(Math.random() * maximum);

    if(chance <= luck) return;
    console.log(`u got ${winAmount}`)
    user.bank.giveMoney('money', winAmount);

}