// import { object, string, number, date } from "yup";

// slider
const slider = tns({
  container: ".slider__carousel",
  items: 1,
  nav: false,
  controls: false
});

document.querySelector('.slider__prev')
  .addEventListener("click", () => {
    slider.goTo('prev');
  });

document.querySelector('.slider__next')
  .addEventListener("click", () => {
    slider.goTo('next');
  });

// tabs
const allTabs = document.querySelectorAll('.catalog__tab');
const allContentItems = document.querySelectorAll('.catalog__content');

document.querySelector('.catalog__tabs')
  .addEventListener('click', (e) => {
    if (!e.target.classList.contains('catalog__tabs')) {
      allTabs.forEach((el) => {
        el.classList.remove('catalog__tab_active');
      });
      allContentItems.forEach((el) => {
        el.classList.remove('catalog__content_active');
      });

      const activeContentIndex = Array.from(allTabs).findIndex((el) => el === e.target.parentNode);
      e.target.closest('.catalog__tab').classList.add('catalog__tab_active');
      Array.from(allContentItems)[activeContentIndex].classList.add('catalog__content_active');
    }
  });

//buttons more
const content = document.querySelector('.catalog__contents');

content.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.closest('.catalog-item__link')) {
    e.target.closest('.catalog-item__wrapper').classList.toggle('catalog-item__wrapper_active');
    e.target.closest('.catalog-item__wrapper').querySelector('.catalog-item__more').classList.toggle('catalog-item__more_active');
  }
});

// modal
const consultationModal = document.getElementById('consultation');
const orderModal = document.getElementById('order');
const thanksModal = document.getElementById('thanks');
const overlay = document.querySelector('.overlay');

const show = (modal) => {
  modal.style.display = 'block';
  overlay.style.display = 'block';
}

const hide = (modal) => {
  modal.style.display = 'none';
  overlay.style.display = 'none';
}

// open
document.addEventListener('click', (e) => {
  if (e.target.dataset.modal === 'consultation') show(consultationModal)
});
document.addEventListener('click', (e) => {
  if (e.target.dataset.modal === 'order') show(orderModal)

  const orderTitle = e.target.closest('.catalog-item') && e.target.closest('.catalog-item').querySelector('.catalog-item__title').textContent;

  document.getElementById('order').querySelector('.modal__description').textContent = orderTitle;
});

// close
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal__close') || e.target.dataset.close === "x") {
    hide(orderModal);
    hide(consultationModal);
  }
});

// validate
const form = document.querySelector('.form');
// const name = document.querySelector('[name=name]');
// const phone = document.querySelector('[name=phone]');
// const email = document.querySelector('[name=email]');
//
// const schema = object({
//   name: string().min().max(5).required(),
//   phone: number().max(10),
//   email: string().email()
// });
//
// const errorHandler = (e) => {
//   console.dir(e.target);
//   // schema.validateSync();
// };
//
// name.addEventListener('blur', errorHandler);
const validateForm = (selector) => {
  $(selector).validate({
    rules: {
      name: {
        required: true,
        minlength: 2
      },
      phone: "required",
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name: {
        required: "Пожалуйста, введите свое имя",
        minlength: jQuery.validator.format("Введите {0} символа!")
      },
      phone: "Пожалуйста, введите номер телефона",
      email: {
        required: "Пожалуйста, введите свою почту",
        email: "Неправильно введен адрес почты"
      }
    }
  });
}

$(document).ready(function() {
  // validate
  validateForm('#consultation-form');
  validateForm('#consultation form');
  validateForm('#order form');
  // phone mask
  $('[name=phone]').mask('+7 (999) 999-99-99');
  // mailer
  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset');
    });
    return false;
  });

  //scroll smooth
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });

  $("a[href^='#']").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });
});

new WOW().init();



