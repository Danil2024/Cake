
// 1. СЛАЙДЕР

const slides = document.querySelectorAll('.slider img');
let slideIndex = 0;
const slideCount = slides.length;

// Функция обновления отображения слайдера
function updateSlider() {
    slides.forEach((img, index) => {
        if (index === slideIndex) {
            img.style.display = 'block';
        } else {
            img.style.display = 'none';
        }
    });
    updateDots(); // Обновляем индикаторы
}

// Показать следующий слайд
function showNextSlide() {
    slideIndex = (slideIndex + 1) % slideCount;
    updateSlider();
}

// Показать предыдущий слайд
function showPreviousSlide() {
    slideIndex = (slideIndex - 1 + slideCount) % slideCount;
    updateSlider();
}

// Переход к конкретному слайду по клику на индикатор
function goToSlide(index) {
    slideIndex = index;
    updateSlider();
}

// Обновление индикаторов (точек)
function updateDots() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        if (index === slideIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Назначаем обработчики событий на кнопки
document.querySelector('.prev-button').addEventListener('click', showPreviousSlide);
document.querySelector('.next-button').addEventListener('click', showNextSlide);

// Запуск слайдера при загрузке
updateSlider();
// Автоматическое переключение каждые 5 секунд
setInterval(showNextSlide, 5000);



// 2. ПОЛНОЭКРАННЫЙ ПРОСМОТР ИЗОБРАЖЕНИЙ

function openFullscreenImage(element) {
    const fullscreenContainer = document.getElementById('fullscreen-container');
    const fullscreenImage = document.getElementById('fullscreen-image');
    
    fullscreenImage.src = element.src;
    fullscreenContainer.style.display = 'flex';
}

function closeFullscreenImage() {
    document.getElementById('fullscreen-container').style.display = 'none';
}


// 3. КНОПКА "НАВЕРХ"

window.onscroll = function() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById('scrollToTopButton').style.display = 'block';
    } else {
        document.getElementById('scrollToTopButton').style.display = 'none';
    }
};

document.getElementById('scrollToTopButton').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});



// 4. МОДАЛЬНОЕ ОКНО С РЕЦЕПТАМИ

const recipes = {
  1: {
    title: "Медовик классический",
    ingredients: "Для теста:\n• Мука — 3 стакана\n• Мёд — 2 ст. ложки\n• Сахар — 1 стакан\n• Яйца — 2 шт.\n• Сливочное масло — 100 г\n• Сода — 1 ч. ложка\n\nДля крема:\n• Сметана (20-25%) — 500 г\n• Сахарная пудра — 1 стакан",
    steps: "1. Растопить мёд со сливочным маслом и сахаром на водяной бане.\n2. Добавить яйца и соду, перемешать.\n3. Постепенно всыпать муку и замесить тесто.\n4. Разделить на 8 частей и раскатать коржи.\n5. Выпекать при 180°C по 5-7 минут каждый.\n6. Взбить сметану с пудрой для крема.\n7. Промазать коржи и оставить на 4-6 часов."
  },
  2: {
    title: "Наполеон",
    ingredients: "Основа:\n• Слоёное тесто — 500 г\n\nКрем:\n• Молоко — 500 мл\n• Яйца — 2 шт.\n• Сахар — 1 стакан\n• Мука — 2 ст. ложки\n• Масло сливочное — 200 г",
    steps: "1. Раскатать тесто и нарезать прямоугольниками.\n2. Выпекать при 200°C до золотистости.\n3. Взбить яйца с сахаром и мукой.\n4. Влить горячее молоко, варить до загустения.\n5. Добавить масло, взбить.\n6. Промазать коржи, посыпать крошкой."
  },
  3: {
    title: "Чизкейк Нью-Йорк",
    ingredients: "Начинка:\n• Творожный сыр — 600 г\n• Сахар — 150 г\n• Яйца — 3 шт.\n• Сливки 33% — 200 мл\n\nОснова:\n• Печенье — 200 г\n• Масло — 100 г",
    steps: "1. Измельчить печенье, смешать с маслом.\n2. Утрамбовать в форму.\n3. Взбить сыр с сахаром.\n4. Добавить яйца и сливки.\n5. Вылить на основу.\n6. Выпекать при 160°C около 60 минут.\n7. Охладить 4-6 часов."
  },
  4: {
    title: "Тирамису",
    ingredients: "• Маскарпоне — 500 г\n• Яйца — 4 шт.\n• Сахар — 100 г\n• Савоярди — 200 г\n• Кофе — 300 мл\n• Какао — 2 ст. ложки",
    steps: "1. Отделить желтки, взбить с сахаром.\n2. Добавить маскарпоне.\n3. Взбить белки, ввести в крем.\n4. Обмакнуть печенье в кофе.\n5. Выложить слоями: печенье, крем.\n6. Убрать в холодильник на 4 часа.\n7. Посыпать какао."
  },
  5: {
    title: "Эклеры",
    ingredients: "Тесто:\n• Вода — 250 мл\n• Масло — 100 г\n• Мука — 150 г\n• Яйца — 4 шт.\n\nКрем:\n• Молоко — 500 мл\n• Сахар — 150 г\n• Желтки — 3 шт.\n• Шоколад — 100 г",
    steps: "1. Заварить тесто на воде с маслом.\n2. Вбить яйца.\n3. Отсадить полоски на противень.\n4. Выпекать при 200°C 25-30 минут.\n5. Приготовить заварной крем.\n6. Наполнить эклеры.\n7. Покрыть шоколадом."
  },
  6: {
    title: "Макаруны",
    ingredients: "• Миндальная мука — 150 г\n• Сахарная пудра — 150 г\n• Белки — 50 г\n• Сахар — 150 г\n• Вода — 50 мл\n• Начинка по вкусу",
    steps: "1. Смешать муку с пудрой.\n2. Взбить белки.\n3. Сварить сироп (118°C).\n4. Влить в белки, взбить.\n5. Вмешать сухую смесь.\n6. Отсадить кружочки.\n7. Выпекать при 150°C 12-14 минут.\n8. Соединить начинкой."
  }
};

// Обработка клика по кнопкам "Рецепт"
document.querySelectorAll('.recipe-btn').forEach(button => {
    button.addEventListener('click', function() {
        const recipeId = this.getAttribute('data-recipe');
        const recipe = recipes[recipeId];
        
        if (recipe) {
            document.getElementById('recipe-title').textContent = recipe.title;
            document.getElementById('recipe-ingredients').textContent = recipe.ingredients;
            document.getElementById('recipe-steps').textContent = recipe.steps;
            
            const modal = document.getElementById('recipe-modal');
            modal.style.display = 'flex';
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
        }
    });
});

// Функция закрытия модального окна
function closeRecipeModal() {
    const modal = document.getElementById('recipe-modal');
    modal.style.display = 'none';
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Возвращаем прокрутку
}

// Закрытие по крестику
document.querySelector('.recipe-modal-close').addEventListener('click', closeRecipeModal);

// Закрытие по клику вне окна
document.getElementById('recipe-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeRecipeModal();
    }
});

// Закрытие по клавише Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeRecipeModal();
    }
});


// 5. КАПЧА И ВАЛИДАЦИЯ ФОРМЫ
let captchaCode = '';

function generateCaptcha() {
    const canvas = document.getElementById('captcha-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    captchaCode = '';
    for (let i = 0; i < 4; i++) {
        captchaCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    ctx.fillStyle = '#f0e6dc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = `rgba(${Math.random() * 200}, ${Math.random() * 200}, ${Math.random() * 200}, 0.3)`;
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
    }
    
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#3e2723';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    for (let i = 0; i < captchaCode.length; i++) {
        const x = 20 + i * 25;
        const y = 20 + (Math.random() - 0.5) * 10;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((Math.random() - 0.5) * 0.3);
        ctx.fillText(captchaCode[i], 0, 0);
        ctx.restore();
    }
}

function validateCaptcha() {
    const input = document.getElementById('captcha-input');
    const errorMsg = document.getElementById('captcha-error');
    
    if (input.value.trim().toLowerCase() !== captchaCode.toLowerCase()) {
        input.classList.add('input-error');
        errorMsg.style.display = 'block';
        generateCaptcha();
        input.value = '';
        return false;
    } else {
        input.classList.remove('input-error');
        errorMsg.style.display = 'none';
        return true;
    }
}

function validateForm(event) {
    event.preventDefault(); // Предотвращаем стандартную отправку формы
    
    const phone = document.querySelector('input[name="phone"]');
    const captcha = document.getElementById('captcha-input');
    let isValid = true;

    phone.classList.remove('input-error');
    captcha.classList.remove('input-error');
    document.getElementById('captcha-error').style.display = 'none';

    const phoneValue = phone.value.trim();
    const phoneRegex = /^\+?\d{10,12}$/;
    
    if (!phoneRegex.test(phoneValue)) {
        phone.classList.add('input-error');
        alert('Номер телефона должен содержать только цифры и начинаться с + (например: +79991234567)');
        isValid = false;
    }

    if (!validateCaptcha()) {
        isValid = false;
    }

    if (isValid) {
        alert('Заявка успешно отправлена! Мы свяжемся с вами.');
        phone.value = '';
        captcha.value = '';
        document.querySelector('input[name="message"]').value = '';
        document.querySelector('input[name="name"]').value = '';
        generateCaptcha();
    }
}

// Привязываем валидацию к форме
document.querySelector('.obratnuj-zvonok').addEventListener('submit', validateForm);

// Генерируем капчу при загрузке
generateCaptcha();
document.getElementById('captcha-canvas').addEventListener('click', generateCaptcha);