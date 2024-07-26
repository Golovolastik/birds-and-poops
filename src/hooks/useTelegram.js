const tg = window.Telegram.WebApp.expand();

export function useTelegram() {

    return {
        tg,
        user: tg.initDataUnsafe?.user,
    }
}