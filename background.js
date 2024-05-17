

// Функция обработки страницы открытой картинки 
function image(){
    // Ставим лайк
    let disliked = document.getElementsByClassName('disliked');
    if (disliked.length > 0){
        disliked[0].click();
    }
    // Копируем тэги
    document.getElementById('copy-tags').click();
}

// Функция обработки страницы меню генерации
function make(){
    // Клик по рандомным кнопкам
    let random_buttons = document.getElementsByClassName('random-tag-button');
    for (let i=0; i<random_buttons.length; i++){
        if (random_buttons[i].getAttribute('data-type').search('Style') != -1){
            // Рандомный стиль
            random_buttons[i].click();
        }
        //https://made.porn/u/PVxpRTFeFpl?tmpId=1gk9un3bim8fc&timePredict=10
    }
    // Старт генерации
    document.getElementById('generate').click();
}

// Функция обработки профиля
function profile(){
    // Находим последнюю картинку
    let last_image = document.getElementsByClassName("grid-item block")[0]
    // Время генерации
    let last_timestamp = last_image.getAttribute("data-timestamp") * 1000;
    let timeout = (last_timestamp + (3 * 60 * 1000) - Date.now())
    if (timeout>0){
        // Если 3 минуты не прошло
        //debugger;
        setTimeout(() => window.location.reload(), timeout);

    }else{
        // Кликаем по последнеей картинке
        last_image.getElementsByTagName("a")[0].click();
    }
}

//
function reload3m(){
    setTimeout(() => window.location.href('https://made.porn/u/PVxpRTFeFpl'), 3*60*1000);
}

// 
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) { 
    // Проверка загрузки страницы
    if(changeInfo.status === 'complete') {
        chrome.tabs.get(tabId, function(tab){
            // Если пустой tab
            if (!tab) return;
            // Отладка
            console.log(new Date().toString());
            console.log(tab.url);
            //
            if (tab.url.search('https://made.porn/i/')!=-1){
                // Изображение
                chrome.scripting
                .executeScript( {
                    target : {tabId : tab.id},
                    func : image,
                })
                .then(() => console.log('Обработано изображение'));
            }
            else if (tab.url.search('https://made.porn/make#')!=-1){
                // Меню генерации
                chrome.scripting
                .executeScript( {
                    target : {tabId : tab.id},
                    func : make,
                })
                .then(() => console.log('Меню генерации'));
            }
            else if (tab.url.search('tmpId=')==-1){
                // Профиль
                chrome.scripting
                .executeScript( {
                    target : {tabId : tab.id},
                    func : profile,
                })
                .then(() => console.log('Обработка профиля'));
            }
            else if (tab.url.search('https://made.porn/')!=-1){
                // Перезагрузка страницы через минуту
                chrome.scripting
                .executeScript( {
                    target : {tabId : tab.id},
                    func : reload3m,
                })
                .then(() => console.log('Перезагрузка через минуту'));
            }
        });

    }
});