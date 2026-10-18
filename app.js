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
// ========================================
// МОДАЛЬНОЕ ОКНО С РЕЦЕПТАМИ
// ========================================

const recipes = {
  1: {
    title: "Медовик классический",
    ingredients: "• Мука — 3 стакана\n• Мёд — 2 ст. ложки\n• Сахар — 1 стакан\n• Яйца — 2 шт.\n• Сливочное масло — 100 г\n• Сода — 1 ч. ложка\n• Сметана (для крема) — 500 г\n• Сахарная пудра (для крема) — 1 стакан",
    steps: "1. Растопите мёд с маслом и сахаром на водяной бане.\n2. Добавьте яйца и соду, перемешайте.\n3. Постепенно всыпьте муку, замесите тесто.\n4. Разделите тесто на 8 частей и раскатайте тонкие коржи.\n5. Выпекайте каждый корж 5-7 минут при 180°C.\n6. Взбейте сметану с сахарной пудрой — это крем.\n7. Промажьте коржи кремом и дайте пропитаться 4-6 часов."
  },
  2: {
    title: "Наполеон",
    ingredients: "• Слоёное тесто — 500 г\n• Молоко — 500 мл\n• Яйца — 2 шт.\n• Сахар — 1 стакан\n• Мука — 2 ст. ложки\n• Сливочное масло — 200 г\n• Ванильный сахар — 1 пакетик",
    steps: "1. Раскатайте слоёное тесто и нарежьте на прямоугольники.\n2. Выпекайте при 200°C до золотистого цвета (15-20 минут).\n3. Для крема: взбейте яйца с сахаром, добавьте муку.\n4. Влейте горячее молоко, варите до загустения.\n5. Остудите и добавьте мягкое масло, взбейте.\n6. Промажьте коржи кремом и посыпьте крошкой сверху.\n7. Дайте пропитаться в холодильнике 2-3 часа."
  },
  3: {
    title: "Чизкейк Нью-Йорк",
    ingredients: "• Творожный сыр — 600 г\n• Сахар — 150 г\n• Яйца — 3 шт.\n• Сливки — 200 мл\n• Печенье (для основы) — 200 г\n• Сливочное масло — 100 г\n• Ванильный экстракт — 1 ч. ложка",
    steps: "1. Измельчите печенье и смешайте с растопленным маслом.\n2. Выложите массу в форму и утрамбуйте — это основа.\n3. Взбейте творожный сыр с сахаром до гладкости.\n4. Добавьте яйца по одному, затем сливки и ваниль.\n5. Вылейте начинку на основу.\n6. Выпекайте при 160°C около 60 минут (центр должен слегка дрожать).\n7. Остудите и уберите в холодильник на 4-6 часов."
  },
  4: {
    title: "Тирамису",
    ingredients: "• Маскарпоне — 500 г\n• Яйца — 4 шт.\n• Сахар — 100 г\n• Печенье Савоярди — 200 г\n• Крепкий кофе — 300 мл\n• Какао-порошок — 2 ст. ложки\n• Ром или амаретто — 2 ст. ложки (по желанию)",
    steps: "1. Отделите желтки от белков.\n2. Взбейте желтки с сахаром до белой массы.\n3. Добавьте маскарпоне и аккуратно перемешайте.\n4. Взбейте белки в крепкую пену и введите в крем.\n5. Смешайте кофе с ромом.\n6. Быстро обмакивайте савоярди в кофе и выкладывайте слоем.\n7. Сверху — слой крема. Повторите.\n8. Уберите в холодильник на 4-6 часов. Перед подачей посыпьте какао."
  },
  5: {
    title: "Эклеры",
    ingredients: "• Вода — 250 мл\n• Сливочное масло — 100 г\n• Мука — 150 г\n• Яйца — 4 шт.\n• Молоко (для крема) — 500 мл\n• Сахар — 150 г\n• Яичные желтки — 3 шт.\n• Шоколад (для глазури) — 100 г",
    steps: "1. Вскипятите воду с маслом, всыпьте муку и заварите тесто.\n2. Остудите и вбейте яйца по одному.\n3. Отсадите тесто на противень длинными полосками.\n4. Выпекайте при 200°C 25-30 минут до золотистости.\n5. Для крема: нагрейте молоко, взбейте желтки с сахаром.\n6. Влейте молоко, варите до загустения, остудите.\n7. Наполните эклеры кремом через отверстие.\n8. Растопите шоколад и покройте эклеры сверху."
  },
  6: {
    title: "Макаруны",
    ingredients: "• Миндальная мука — 150 г\n• Сахарная пудра — 150 г\n• Яичные белки — 50 г (2 шт.)\n• Сахар — 150 г\n• Вода — 50 мл\n• Пищевые красители\n• Ганаш или джем (для начинки)",
    steps: "1. Смешайте миндальную муку с сахарной пудрой.\n2. Взбейте белки до мягких пиков.\n3. Сварите сироп из сахара и воды (118°C).\n4. Влейте сироп в белки, взбивайте до стойких пиков.\n5. Аккуратно вмешайте сухую смесь (макаронаж).\n6. Отсадите кружочки на пергамент, дайте подсохнуть 30 минут.\n7. Выпекайте при 150°C около 12-14 минут.\n8. Соедините половинки начинкой и дайте созреть в холодильнике сутки."
  }
};

// Открытие модального окна
document.querySelectorAll('.recipe-btn').forEach(button => {
  button.addEventListener('click', function() {
    const recipeId = this.getAttribute('data-recipe');
    const recipe = recipes[recipeId];
    
    if (recipe) {
      document.getElementById('recipe-title').textContent = recipe.title;
      document.getElementById('recipe-ingredients').textContent = recipe.ingredients;
      document.getElementById('recipe-steps').textContent = recipe.steps;
      document.getElementById('recipe-modal').classList.add('active');
      document.body.style.overflow = 'hidden';  // Запрет прокрутки фона
    }
  });
});

// Закрытие по крестику
document.querySelector('.recipe-modal-close').addEventListener('click', function() {
  document.getElementById('recipe-modal').classList.remove('active');
  document.body.style.overflow = '';
});

// Закрытие по клику вне окна
document.getElementById('recipe-modal').addEventListener('click', function(e) {
  if (e.target === this) {
    this.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Закрытие по клавише Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.getElementById('recipe-modal').classList.remove('active');
    document.body.style.overflow = '';
  }
});