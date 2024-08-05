/* ================================ common ================================ */
let url = location.href.split('/')[(location.href.split('/').length - 2)];
let html = document.querySelector("html"),
    body = document.querySelector("body"),
    main = document.querySelector("main"),
    header = document.querySelector("header"),
    footer = document.querySelector("footer"),
    menuicon = document.querySelector(".menuicon");

window.addEventListener("DOMContentLoaded",function(){
    let scrollY = window.scrollY,
        lastScroll = 0;
    $(".menuicon").on("click", function () {
        $(this).toggleClass("active");
    });

    $("#gnb>li>a").off("click").click(function(e){
        if(window.innerWidth <= 1024 && ($(this).siblings(".sub-menu").length > 0)){
            e.preventDefault();
            $(".sub-menu").stop().slideUp();
            $(this).siblings(".sub-menu").stop().slideToggle();
        }
    });

    $(".header-wrap #gnb>li").off("mouseenter").mouseenter(function(e){
        if(window.innerWidth > 1024){
            $(this).addClass("hover");
        }
    });
    $(".header-wrap #gnb>li").off("mouseleave").mouseleave(function(e){
        if(window.innerWidth > 1024){
            $(this).removeClass("hover");
        }
    });

    if(document.querySelector(".category_wrap")){
        $(".category_wrap>span").off("click").click(function(e){
            if(window.innerWidth < 1024 && $(this).siblings()){
                $(this).toggleClass("active");
                $(this).siblings().stop().slideToggle();
            }
        });
        window.addEventListener("resize", function(e) {
            if (window.innerWidth > 1024) {
                document.querySelector(".category_wrap .category").style = "";
            }
        });
    }
    // window.addEventListener("scroll", () => {
    //     scrollY = window.scrollY;
    //     if (window.innerWidth <= 1024 && header_gnb.classList.contains("active")) return false;
    //     let scrollTop = window.scrollY;
    //     if (scrollTop > lastScroll) {
    //         header.classList.remove("active");
    //     } else {
    //         header.classList.add("active");
    //     }
    //     lastScroll = scrollTop;
    // });
    if(url == "main"){
        var main_slide = new Swiper(".main_slide", {
            effect: "fade",
            loop: true,
            autoplay: {
                delay: 8000,
            },
            speed: 1000,
        });
        var main_s03_slide = new Swiper("#main_page .s03 .swiper", {
            direction: "vertical",
            loop: true,
            autoplay: {
                delay: 8000,
            },
            speed: 1000,
            autoHeight: true,
            on:{
                slideChange: function(el) {
                    let img_slide = document.querySelector(".s03 .img_slide");
                    console.log(this.realIndex)
                    img_slide.querySelector(".center img").src = `../images/main/s03_0${this.realIndex}.png`;
                }
            }
        });
        main_s03_slide.slideNext();
    }

    var rnd_slide = new Swiper(".rnd_slide", {
        slidesPerView: "auto",
        spaceBetween: 20,
    });

    document.querySelectorAll(".rnd_slide").forEach(function(el,index){
        el.addEventListener("click",function(){
            rnd_slide.slideNext();
        });
    });

    if(url != "main"){
        document.querySelector(".page_arrow").addEventListener("click",function(e){
            e.preventDefault();
            window.scrollTo({top:document.querySelector(".s01").offsetTop, behavior:"smooth"})
        });
    }
});

/* writeText는 local이나 https에서만 작동함, http에서는 작동안함 */
//innertext.textContent.trim().replace(/[^0-9]/g,"");
function copytext(elementName){
    let copyClick = document.querySelector(`${elementName}`);
    if(!copyClick || copyClick == null || copyClick == undefined) return false;
    copyClick.addEventListener("click", function(e) {
        e.preventDefault();
        let innertext = copyClick.textContent.trim();
        window.navigator.clipboard.writeText(innertext).then(() => {
            alert("복사되었습니다.");
        });
    });    
};





/* ================================ contact ================================ */
const form = document.querySelector(".contact form");
if (form) {
    let f_submit = document.querySelector(".f_submit"),
        input_company = document.querySelector(".input_company_name"),
        input_name = document.querySelector(".input_name"),
        input_tel = document.querySelector(".input_tel"),
        input_email = document.querySelector(".input_email"),
        textarea_detail = document.querySelector(".textarea_detail"),
        input_privacy = document.querySelector(".input_privacy"),
        file_btn = document.querySelectorAll("input.file_btn"),
        file_name = document.querySelectorAll(".file_name"),
        division_button_wrap = document.querySelector(".division .button_wrap"),
        num = /[0-9]/,
        email = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    /* Form Enter X */
    form.addEventListener('keydown', function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        };
    }, true);

    division_button_wrap.querySelectorAll(".button").forEach(function(el,index){
        el.addEventListener("click",function(e){
            e.preventDefault();
            division_button_wrap.querySelector(".button.active").classList.remove("active");
            el.classList.add("active");
            division_button_wrap.querySelector("input").value = el.textContent;
        });
    });
    /* file */
    if (file_btn[0]) {
        document.querySelectorAll(".file_wrap .btn").forEach(function(el,index){
            el.addEventListener("click",function(e){
                e.preventDefault();
                el.nextElementSibling.nextElementSibling.click();
            });
        });
        file_btn.forEach((el, index) => {
            el.addEventListener("change", () => {
                if (el.files[0] == undefined) return false;
                file_name[index].textContent = el.files[0].name;
                // if (el.files[0].size >= 1024) {
                //     if (el.files[0].size >= (1024 * 1024 * 1024)) {
                //         alert("1000MB를 초과하였습니다.");
                //         file_name[index].textContent = "";
                //         el.value = "";
                //     } else {
                //         file_name[index].innerHTML += `<span class="file_size">${(el.files[0].size / (1024 * 1024)).toFixed(2)} MB</span>`;
                //     }
                // } else {
                //     file_name[index].innerHTML += `<span class="file_size">${(el.files[0].size / (1024 * 1024)).toFixed(10)} MB</span>`;
                // }
            });
        });
    }

    function contactCheck(el) {
        if (el == input_tel && !num.test(el.value.trim())) {
            el.focus();
            return false;
        } else if (el == input_email && !email.test(input_email.value.trim())) {
            el.focus();
            return false;
        } else if (el == input_privacy && !el.checked) {
            el.focus();
            return false;
        } else if(!el.value.trim().length > 0 || el.value.trim().length == 0) {
            el.focus();
            return false;
        }
        return true;
    }

    // f_submit.addEventListener("click", () => {
    //     if (!contactCheck(input_name)) {
    //         alert("이름을 입력해주세요");
    //         return false;
    //     }
    //     f_submit.disabled = false;
    //     form.submit();
    // });
}
