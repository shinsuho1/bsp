/* ================================ common ================================ */
let url = location.href.split('/')[(location.href.split('/').length - 2)];
let html = document.querySelector("html"),
    body = document.querySelector("body"),
    main = document.querySelector("main"),
    header = document.querySelector("header"),
    footer = document.querySelector("footer"),
    menuicon = document.querySelector(".menuicon");

window.addEventListener("DOMContentLoaded", function () {
    let scrollY = window.scrollY,
        lastScroll = 0;
    $(".menuicon").on("click", function () {
        $(this).toggleClass("active");
        $("#gnb").toggleClass("active");
    });

    $("#gnb>li>a").off("click").click(function (e) {
        if (window.innerWidth <= 1024 && ($(this).siblings(".sub-menu").length > 0)) {
            e.preventDefault();
            $(".sub-menu").stop().slideUp();
            $(this).siblings(".sub-menu").stop().slideToggle();
        }
    });

    $(".header-wrap #gnb>li").off("mouseenter").mouseenter(function (e) {
        if (window.innerWidth > 1024) {
            $(this).addClass("hover");
        }
    });
    $(".header-wrap #gnb>li").off("mouseleave").mouseleave(function (e) {
        if (window.innerWidth > 1024) {
            $(this).removeClass("hover");
        }
    });

    if (document.querySelector(".category_wrap")) {
        $(".category_wrap>span").off("click").click(function (e) {
            if (window.innerWidth < 1024 && $(this).siblings()) {
                $(this).toggleClass("active");
                $(this).siblings().stop().slideToggle();
            }
        });
        window.addEventListener("resize", function (e) {
            if (window.innerWidth > 1024) {
                document.querySelector(".category_wrap .category").style = "";
            }
        });
    }
    window.addEventListener("scroll", () => {
        if(window.scrollY >= document.querySelector(".s01").offsetTop){
            header.classList.add("active")
        }else{
            header.classList.remove("active");
        }
        // scrollY = window.scrollY;
        // if (window.innerWidth <= 1024 && header_gnb.classList.contains("active")) return false;
        // let scrollTop = window.scrollY;
        // if (scrollTop > lastScroll) {
        //     header.classList.remove("active");
        // } else {
        //     header.classList.add("active");
        // }
        // lastScroll = scrollTop;
    });

    if (url == "main") {
        var main_slide = new Swiper(".main_slide", {
            effect: "fade",
            loop: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction : false,
            },
            speed: 1000,
        });
        function remove_class(){
            $(".img_slide").removeClass("type01");
            $(".img_slide").removeClass("type02");
            $(".img_slide").removeClass("type03");
        }
        var moblie_img_slide = new Swiper(".moblie_img_slide",{
            loop: true,
            speed: 1000,
            slidesPerView: 1,
            watchSlidesProgress: true,
            spaceBetween: 20,
            // thumbs: {
            //     swiper: s03_text_slide,
            // },
        });

        var s03_text_slide = new Swiper("#main_page .s03 .text_slide", {
            direction: "vertical",
            // autoplay: {
            //     delay: 1000,
            disableOnInteraction : false,
            // },
            loop:true,
            speed: 1000,
            slidesPerView: "auto",
            // autoHeight: true,
            centeredSlides: true,
            navigation: {
                nextEl: ".text_slide_wrap .next",
                prevEl: ".text_slide_wrap .prev",
            },
            thumbs: {
                swiper: moblie_img_slide,
            },
            on: {
                slideChange: function (el) {
                    remove_class();
                    $(".img_slide").addClass(`type0${this.realIndex}`);
                }
            },
            breakpoints:{
                541:{
                    direction: "vertical",
                    effect: "slide",
                },
                0:{
                    direction: "horizontal",
                    effect: "fade",
                }
            }
        });


        const canvas_ = document.querySelector("canvas");

        function drawEllipse(ctx, x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise) {
            ctx.beginPath();
            ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#DEDEDE";
            ctx.stroke();
        }

        function drawCircle(ctx, x, y, radius, color) {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
        }

        const circles = [{
                color: '#DEDEDE',
                angle: 1.3
            },
            {
                color: '#DEDEDE',
                angle: 3
            },
            {
                color: '#DEDEDE',
                angle: 4.5
            },
            {
                color: '#DEDEDE',
                angle: 6
            },
        ];

        function animate() {
            let ctx = canvas_.getContext('2d'),
                canvasWidth = canvas_.width,
                canvasHeight = canvas_.height,
                centerX = canvasWidth / 2,
                centerY = canvasHeight / 2,
                radiusX = (canvasWidth / 2) - 20,
                radiusY = (canvasHeight / 2) - 20;

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            drawEllipse(ctx, centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI, false);

            circles.forEach(function(el, index) {
                const x = centerX + radiusX * Math.cos(el.angle);
                const y = centerY + radiusY * Math.sin(el.angle);
                drawCircle(ctx, x, y, 5, el.color);
                el.angle += 0.01;
            });
            requestAnimationFrame(animate);
        }

        animate();

        if(window.innerWidth <= 1460){
            canvas_.width = 500;
            canvas_.height = 500;
        }
        if(window.innerWidth <= 1024){
            canvas_.width = 400;
            canvas_.height = 400;
        }
        if(window.innerWidth <= 767){
            canvas_.width = 300;
            canvas_.height = 300;
        }

        window.addEventListener("resize",function(){
            if(window.innerWidth > 1460){
                canvas_.width = 600;
                canvas_.height = 600;
            }
            if(window.innerWidth <= 1460){
                canvas_.width = 500;
                canvas_.height = 500;
            }
            if(window.innerWidth <= 1024){
                canvas_.width = 400;
                canvas_.height = 400;
            }
            if(window.innerWidth <= 767){
                canvas_.width = 300;
                canvas_.height = 300;
            }
        });
    }

    if (url != "main") {
        document.querySelector(".page_arrow").addEventListener("click", function (e) {
            e.preventDefault();
            window.scrollTo({ top: document.querySelector(".s01").offsetTop, behavior: "smooth" })
        });
    }

    if(document.querySelector(".rnd_slide")){
        var rnd_slide = new Swiper(".rnd_slide", {
            slidesPerView: "auto",
            spaceBetween: 20,
        });
        document.querySelectorAll(".rnd_slide").forEach(function (el, index) {
            el.addEventListener("click", function () {
                rnd_slide.slideNext();
            });
        });
    }


    let history_line = document.querySelector(".history .bar .line");
    if (history_line) {
        let max_height = document.querySelector(".history .bar").getBoundingClientRect().height,
            history_element = document.querySelectorAll(".history .history_box .aos-init");

        history_element.forEach(function (el, index) {
            if (!el.classList.contains("aos-animate")) {
                return false;
            } else {
                if (el == history_element[history_element.length - 1]) {
                    history_line.style.height = max_height + "px";
                }
                history_line.style.height = el.offsetTop + "px";
            }
        });
        window.addEventListener("scroll", function (e) {
            let max_height = document.querySelector(".history .bar").getBoundingClientRect().height,
                history_element = document.querySelectorAll(".history .history_box .aos-init");

            history_element.forEach(function (el, index) {
                if (!el.classList.contains("aos-animate")) {
                    return false;
                } else {
                    if (el == history_element[history_element.length - 1]) {
                        history_line.style.height = max_height + "px";
                    }
                    history_line.style.height = el.offsetTop + "px";
                }
            });
        });
        window.addEventListener("scrollend", () => {
            let max_height = document.querySelector(".history .bar").getBoundingClientRect().height,
                history_element = document.querySelectorAll(".history .history_box .aos-init");
            history_element.forEach(el => {
                if (!el.classList.contains("aos-animate")) {
                    return false;
                } else {
                    if (el == history_element[history_element.length - 1]) {
                        history_line.style.height = max_height + "px";
                        return false;
                    };
                    history_line.style.height = el.offsetTop + "px";
                }
            });
        });

    }
});

/* ================================ contact ================================ */
const form = document.querySelector(".contact form");
if (form) {
    let f_submit = document.querySelector(".submit"),
        input_company = document.querySelector(".input_company"),
        input_title = document.querySelector(".input_title"),
        input_tel01 = document.querySelector(".input_tel01"),
        input_tel02 = document.querySelector(".input_tel02"),
        input_tel03 = document.querySelector(".input_tel03"),
        input_email = document.querySelector(".input_email"),
        // input_division = document.querySelector(".input_division"),
        // textarea_detail = document.querySelector(".textarea_detail"),
        input_privacy = document.querySelector(".input_privacy"),
        file_btn = document.querySelectorAll(".input_file"),
        division_button_wrap = document.querySelector(".division .button_wrap"),
        num = /[0-9]/,
        email = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    /* Form Enter X */
    form.addEventListener('keydown', function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        };
    }, true);

    division_button_wrap.querySelectorAll(".button").forEach(function (el, index) {
        el.addEventListener("click", function (e) {
            e.preventDefault();
            division_button_wrap.querySelector(".button.active").classList.remove("active");
            el.classList.add("active");
            division_button_wrap.querySelector("input").value = el.textContent;
        });
    });
    
    /* file */
    if (file_btn[0]) {
        document.querySelectorAll(".file_wrap .btn").forEach(function (el, index) {
            el.addEventListener("click", function (e) {
                e.preventDefault();
                el.nextElementSibling.nextElementSibling.click();
            });
        });
        file_btn.forEach((el, index) => {
            el.addEventListener("change", () => {
                if (el.files[0] == undefined) return false;
                file_name[index].textContent = el.files[0].name;
                if (el.files[0].size >= 1024) {
                    if (el.files[0].size >= (1024 * 1024 * 1024)) {
                        alert("1000MB를 초과하였습니다.");
                        file_name[index].textContent = "";
                        el.value = "";
                    } else {
                        file_name[index].innerHTML += `<span class="file_size">${(el.files[0].size / (1024 * 1024)).toFixed(2)} MB</span>`;
                    }
                } else {
                    file_name[index].innerHTML += `<span class="file_size">${(el.files[0].size / (1024 * 1024)).toFixed(10)} MB</span>`;
                }
            });
        });
    }

    function contactCheck(el) {

        if (el == input_email && !email.test(input_email.value.trim())) {
            el.focus();
            return false;
        } 
        else if (el == input_privacy && !el.checked) {
            el.focus();
            return false;
        } 
        else if (!el.value.trim().length > 0 || el.value.trim().length == 0) {
            el.focus();
            return false;
        }
        return true;
    }

    f_submit.addEventListener("click", () => {
        if (!contactCheck(input_company)) {
            alert("업체명을 입력해 주세요.");
            return false;
        }
        if(!contactCheck(input_title)){
            alert("제목을 입력해 주세요.");
            return false;
        }
        let tel = "";
        tel += input_tel01.value;
        tel += input_tel02.value;
        tel += input_tel03.value;
        if(!num.test(tel.trim())){
            input_tel01.focus();
            alert("연락처를 입력해 주세요");
            return false;
        }
        if(!contactCheck(input_email)){
            alert("이메일을 입력해 주세요.");
            return false;
        }

        if(!contactCheck(input_privacy)){
            alert("개인정보 처리방침에 동의해 주세요.");
            return false;        
        }

        f_submit.disabled = false;
        form.submit();
    });
}
