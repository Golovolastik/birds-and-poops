const tg = window.Telegram.WebApp;
//tg.expand();
export function useTelegram() {

    return {
        tg,
        user: tg.initDataUnsafe?.user,
    }
}