// ========================================
// 1. НАСТРОЙКА ПЕРЕМЕННЫХ И ПОИСК ЭЛЕМЕНТОВ
// ========================================

// Находим контейнер слайдера на странице
const slider = document.querySelector('.slider');

// Находим кнопки "Предыдущий" и "Следующий"
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

// Собираем все изображения внутри слайдера в массив
const slides = Array.from(slider.querySelectorAll('img'));

// Считаем общее количество слайдов
const slideCount = slides.length;

// Переменная для отслеживания текущего слайда (начинаем с первого)
let slideIndex = 0;


// ========================================
// 2. ОБРАБОТЧИКИ СОБЫТИЙ ДЛЯ КНОПОК
// ========================================

// При клике на "Предыдущий" — вызываем функцию showPreviousSlide
prevButton.addEventListener('click', showPreviousSlide);

// При клике на "Следующий" — вызываем функцию showNextSlide
nextButton.addEventListener('click', showNextSlide);


// ========================================
// 3. ФУНКЦИИ ПЕРЕКЛЮЧЕНИЯ СЛАЙДОВ
// ========================================

// Показать предыдущий слайд
function showPreviousSlide() {
    // Уменьшаем индекс на 1.
    // Если были на первом слайде (0), то переходим на последний.
    // Формула (slideIndex - 1 + slideCount) % slideCount обеспечивает "зацикливание"
    slideIndex = (slideIndex - 1 + slideCount) % slideCount;
    updateSlider();
}

// Показать следующий слайд
function showNextSlide() {
    // Увеличиваем индекс на 1.
    // Если были на последнем слайде, то переходим на первый.
    slideIndex = (slideIndex + 1) % slideCount;
    updateSlider();
}


// ========================================
// 4. ФУНКЦИЯ ОБНОВЛЕНИЯ ОТОБРАЖЕНИЯ СЛАЙДЕРА
// ========================================

function updateSlider() {
    // Перебираем все слайды
    slides.forEach((slide, index) => {
        if (index === slideIndex) {
            // Если это текущий слайд — показываем его
            slide.style.display = 'block';
        } else {
            // Иначе — скрываем
            slide.style.display = 'none';
        }
    });
}

// Запускаем слайдер при загрузке страницы (показываем первый слайд)
updateSlider();


// ========================================
// 5. ПОЛНОЭКРАННЫЙ ПРОСМОТР ИЗОБРАЖЕНИЙ
// ========================================

// Функция открытия изображения на весь экран
function openFullscreenImage(element) {
    // Находим контейнер для полноэкранного просмотра
    const fullscreenContainer = document.getElementById('fullscreen-container');
    // Находим само изображение внутри контейнера
    const fullscreenImage = document.getElementById('fullscreen-image');

    // Копируем путь к изображению, на которое кликнули
    fullscreenImage.src = element.src;

    // Показываем контейнер (делаем его видимым)
    fullscreenContainer.style.display = 'block';
}

// Функция закрытия полноэкранного просмотра
function closeFullscreenImage() {
    const fullscreenContainer = document.getElementById('fullscreen-container');
    // Скрываем контейнер
    fullscreenContainer.style.display = 'none';
}

// 6. КНОПКА "НАВЕРХ" И ПЛАВНАЯ ПРОКРУТКА // 

// Отслеживаем прокрутку страницы
window.onscroll = function() {
    scrollFunction();
};

// Функция показа/скрытия кнопки "Наверх"
function scrollFunction() {
    // Если прокрутили больше 20 пикселей вниз — показываем кнопку
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById('scrollToTopButton').style.display = 'block';
    } else {
        // Иначе — скрываем
        document.getElementById('scrollToTopButton').style.display = 'none';
    }
}

// При клике на кнопку "Наверх" — запускаем плавную прокрутку
document.getElementById('scrollToTopButton').addEventListener('click', function() {
    scrollToTop();
});

// Функция плавной прокрутки наверх
function scrollToTop() {
    // Вычисляем шаг прокрутки (чем выше страница, тем быстрее прокрутка)
    const scrollStep = -window.scrollY / 15;
    
    // Запускаем интервал, который будет плавно прокручивать страницу
    const scrollInterval = setInterval(function() {
        if (window.scrollY !== 0) {
            // Если ещё не достигли верха — прокручиваем на шаг
            window.scrollBy(0, scrollStep);
        } else {
            // Если достигли верха — останавливаем интервал
            clearInterval(scrollInterval);
        }
    }, 15);
}