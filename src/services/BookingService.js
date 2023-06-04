const bookingState = [{
    id: "PENDING_DRIVER",
    name: "Очікуємо на водія"
}, {
    id: "CONFIRMED",
    name: "Підтверджено"
}, {
    id: "CANCELED",
    name: "Скасовано"
}, {
    id: "IN_PROGRESS",
    name: "В прогресі"
}, {
    id: "RETURNED",
    name: "Авто повернуто"
}, {
    id: "FINISHED",
    name: "Завершено"
}];

export const getBookingState = (state) => {
    return bookingState.find(el => el.id === state).name;
}