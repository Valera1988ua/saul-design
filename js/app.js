(() => {
    "use strict";
    const popup = function() {
        let popupId = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
        const popupLinks = document.querySelectorAll("[data-popup-open]");
        const popupCloseIcon = document.querySelectorAll("[data-popup-close]");
        let logging = true;
        let isOpen = false;
        let hash;
        let popup;
        let lastFocusEl;
        const focusElements = [ "a[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "button:not([disabled]):not([aria-hidden])", "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "area[href]", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])' ];
        const focusElCurrentPopup = popup => popup.querySelectorAll(focusElements);
        const popupLogging = message => logging ? FLS(`[Попап]: ${message}`) : null;
        const getHash = popupSelector => window.location.hash ? window.location.hash : `#${popupSelector.getAttribute("id")}`;
        const setHash = hash => hash && history.pushState("", "", hash);
        const removeHash = () => history.pushState("", "", window.location.href.split("#")[0]);
        if (popupLinks.length) popupLinks.forEach((link => {
            link.addEventListener("click", popupOpenAction);
        }));
        if (popupId !== null) popupOpen(popupId);
        function popupOpenAction(e) {
            const {target: targetElement} = e;
            if (e.target.closest([ "[data-popup-open]" ])) {
                const popupName = targetElement.getAttribute("data-popup-open").replace("#", "");
                const currentPopup = document.getElementById(popupName);
                popupOpen(currentPopup);
                lastFocusEl = targetElement.closest([ "[data-popup-open]" ]);
                e.preventDefault();
            }
        }
        function popupOpen(currentPopup) {
            if (currentPopup && bodyLockStatus) {
                const popupActive = document.querySelector(".popup.open");
                document.dispatchEvent(new CustomEvent("beforePopupOpen", {
                    detail: {
                        popup: currentPopup
                    }
                }));
                popupActive ? popupClose(popupActive) : bodyLock();
                currentPopup.classList.add("open");
                currentPopup.setAttribute("aria-hidden", "false");
                popup = currentPopup;
                isOpen = true;
                hash = getHash(currentPopup);
                setHash(hash);
                popupLogging(`Відкрив попап`);
                setTimeout((() => {
                    focusTrap();
                }), 50);
                currentPopup.addEventListener("click", closePopupOutside);
                document.dispatchEvent(new CustomEvent("afterPopupOpen", {
                    detail: {
                        popup: currentPopup
                    }
                }));
            }
        }
        if (popupCloseIcon.length) popupCloseIcon.forEach((item => {
            item.addEventListener("click", popupCloseAction);
        }));
        function popupCloseAction(e) {
            if (e.target.closest("[data-popup-close]")) {
                popupClose(e.target.closest(".popup"));
                e.preventDefault();
            }
        }
        function closePopupOutside(e) {
            if (!e.target.closest(".popup__content")) popupClose(e.target.closest(".popup"));
        }
        function popupClose(popupActive) {
            if (!isOpen || !bodyLockStatus) return;
            document.dispatchEvent(new CustomEvent("beforePopupClose", {
                detail: {
                    popup: popupActive
                }
            }));
            popupActive.classList.remove("open");
            popupActive.setAttribute("aria-hidden", "true");
            bodyUnlock();
            isOpen = false;
            removeHash();
            popupLogging(`Закрив попап`);
            setTimeout((() => {
                focusTrap();
            }), 50);
            document.dispatchEvent(new CustomEvent("afterPopupClose", {
                detail: {
                    popup: popupActive
                }
            }));
        }
        document.addEventListener("keydown", (e => {
            const {code: keyEvent} = e;
            if (keyEvent === "Escape") {
                e.preventDefault();
                const popupActive = document.querySelector(".popup.open");
                if (popupActive) popupClose(popupActive);
                return;
            }
            if (keyEvent == "Tab" && isOpen) {
                focusCatch(e);
                return;
            }
        }));
        function focusTrap() {
            if (!isOpen && lastFocusEl) lastFocusEl.focus(); else {
                const focusable = focusElCurrentPopup(popup);
                focusable[0].focus();
            }
        }
        function focusCatch(e) {
            const focusable = focusElCurrentPopup(popup);
            const focusArray = Array.prototype.slice.call(focusable);
            const focusedIndex = focusArray.indexOf(document.activeElement);
            if (e.shiftKey && focusedIndex === 0) {
                focusArray[focusArray.length - 1].focus();
                e.preventDefault();
            }
            if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
                focusArray[0].focus();
                e.preventDefault();
            }
        }
        function openToHash() {
            if (!hash) return;
            const popup = document.getElementById(hash);
            if (popup) popupOpen(popup);
        }
        window.addEventListener("load", (() => {
            setTimeout((() => {
                if (window.location.hash) openToHash();
            }), 2e3);
        }));
        window.addEventListener("hashchange", (() => {
            if (window.location.hash) openToHash();
        }));
    };
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function addLoadedClass() {
        window.addEventListener("load", (() => {
            setTimeout((() => {
                document.documentElement.classList.add("loaded");
            }), 0);
        }));
    }
    function menuInit() {
        const menu = document.querySelector(".icon-menu");
        if (menu) document.addEventListener("click", (e => {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    function menuClose() {
        bodyUnlock();
        document.documentElement.classList.remove("menu-open");
    }
    let bodyLockStatus = true;
    let bodyLockToggle = function() {
        let delay = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 500;
        return document.documentElement.classList.contains("lock") ? bodyUnlock(delay) : bodyLock(delay);
    };
    let bodyUnlock = function() {
        let delay = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 500;
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lockPaddings = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (const lockPadding of lockPaddings) lockPadding.style.paddingRight = "0px";
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((() => {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = function() {
        let delay = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 500;
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lockPaddings = document.querySelectorAll("[data-lp]");
            for (const lockPadding of lockPaddings) lockPadding.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((() => {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function windowLoad() {
        document.addEventListener("click", documentActons);
        intersectingSections();
    }
    function documentActons(e) {
        const {target: targetElement} = e;
        if (targetElement.closest(".form")) return;
        e.preventDefault();
        if (targetElement.hasAttribute("data-goto")) {
            const gotoElement = document.querySelector(`${targetElement.dataset.goto}`);
            const headerHeight = document.querySelector("header.header").offsetHeight;
            if (gotoElement) {
                document.documentElement.classList.contains("menu-open") ? menuClose() : null;
                let targetBlockElementPosition = gotoElement.getBoundingClientRect().top + scrollY;
                window.scrollTo({
                    top: targetBlockElementPosition - headerHeight,
                    behavior: "smooth"
                });
            }
        }
        if (targetElement.classList.contains("item-works__type") && !targetElement.classList.contains("_active")) {
            const activeButton = document.querySelector(".item-works__type._active");
            const filterElements = document.querySelectorAll(".item-works__item");
            const {filter: workType} = targetElement.dataset;
            targetElement.classList.add("_active");
            activeButton.classList.remove("_active");
            filterElements.forEach((element => {
                const {filter: filterValueEl} = element.dataset;
                workType === "*" || filterValueEl === workType ? element.hidden = false : element.hidden = true;
            }));
        }
    }
    const delay = time => new Promise((resolve => setTimeout(resolve, time * 1e3)));
    function formSubmit() {
        const forms = document.forms;
        if (forms.length) for (const form of forms) {
            form.addEventListener("submit", (e => {
                const form = e.target;
                formSubmitAction(form, e);
            }));
            form.addEventListener("reset", (e => {
                const form = e.target;
                formValidate.formClean(form);
            }));
        }
        async function formSubmitAction(form, e) {
            const error = !form.hasAttribute("data-no-validate") ? formValidate.getErrors(form) : 0;
            e.preventDefault();
            if (error !== 0) return;
            form.classList.add("_sending");
            await delay(3);
            form.classList.remove("_sending");
            formSend(form);
        }
        async function formSend(form) {
            const name = form.querySelector("#yourName").value;
            await formValidate.formClean(form);
            const formDonePopup = document.getElementById("popup");
            const popupText = formDonePopup.querySelector(".popup__text");
            popupText.textContent = name;
            popup(formDonePopup);
            FLS("Форму відправлено");
        }
    }
    document.body.addEventListener("focusin", (e => {
        const {target: targetElement} = e;
        if (targetElement.tagName === "INPUT" || targetElement.tagName === "TEXTAREA") {
            if (!targetElement.hasAttribute("data-no-focus-classes")) {
                targetElement.classList.add("_form-focus");
                targetElement.parentElement.classList.add("_form-focus");
            }
            formValidate.removeError(targetElement);
            targetElement.hasAttribute("data-validate") ? formValidate.removeError(targetElement) : null;
        }
    }));
    document.body.addEventListener("focusout", (e => {
        const {target: targetElement} = e;
        if (targetElement.tagName === "INPUT" || targetElement.tagName === "TEXTAREA") {
            if (!targetElement.hasAttribute("data-no-focus-classes")) {
                targetElement.classList.remove("_form-focus");
                targetElement.parentElement.classList.remove("_form-focus");
            }
            targetElement.hasAttribute("data-validate") ? formValidate.validateInput(targetElement) : null;
        }
    }));
    let formValidate = {
        getErrors(form) {
            let error = 0;
            let formRequiredItems = form.querySelectorAll("*[data-required]");
            if (formRequiredItems.length) formRequiredItems.forEach((formRequiredItem => {
                if (formRequiredItem.offsetParent !== null) error += this.validateInput(formRequiredItem);
            }));
            return error;
        },
        validateInput(formRequiredItem) {
            let error = 0;
            if (formRequiredItem.dataset.required === "email") {
                formRequiredItem.value = formRequiredItem.value.replace(" ", "");
                if (this.emailTest(formRequiredItem)) {
                    this.addError(formRequiredItem);
                    error++;
                } else this.removeError(formRequiredItem);
            } else if (formRequiredItem.dataset.required === "name" && formRequiredItem.value.length < 3) {
                this.addError(formRequiredItem);
                error++;
            } else if (!formRequiredItem.value.trim()) {
                this.addError(formRequiredItem);
                error++;
            } else this.removeError(formRequiredItem);
            return error;
        },
        addError(formRequiredItem) {
            formRequiredItem.classList.add("_form-error");
            formRequiredItem.parentElement.classList.add("_form-error");
            formRequiredItem.classList.remove("_form-done");
            formRequiredItem.parentElement.classList.remove("_form-done");
            let inputError = formRequiredItem.parentElement.querySelector(".form__error");
            if (inputError) formRequiredItem.parentElement.removeChild(inputError);
            if (formRequiredItem.dataset.error) formRequiredItem.parentElement.insertAdjacentHTML("beforeend", `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
        },
        removeError(formRequiredItem) {
            formRequiredItem.classList.remove("_form-error");
            formRequiredItem.parentElement.classList.remove("_form-error");
            formRequiredItem.classList.add("_form-done");
            formRequiredItem.parentElement.classList.add("_form-done");
            if (formRequiredItem.parentElement.querySelector(".form__error")) formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector(".form__error"));
        },
        formClean(form) {
            form.reset();
            const inputs = form.querySelectorAll("input,textarea");
            for (const input of inputs) {
                input.parentElement.classList.remove("_form-focus");
                input.classList.remove("_form-focus");
                formValidate.removeError(input);
                input.parentElement.classList.remove("_form-done");
                input.classList.remove("_form-done");
            }
            return new Promise((resolve => {
                requestAnimationFrame((() => {
                    resolve();
                }));
            }));
        },
        emailTest(formRequiredItem) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
        }
    };
    function intersectingSections() {
        const sections = document.querySelectorAll("section");
        const linksNav = document.querySelectorAll(".menu__link");
        function callback(entries, observer) {
            entries.forEach((entrie => {
                const {target: targetElement, isIntersecting} = entrie;
                if (isIntersecting) linksNav.forEach((link => {
                    const {goto: linkGoto} = link.dataset;
                    targetElement.classList.contains(`${linkGoto.replace(".", "")}`) ? link.classList.add("_active-link") : link.classList.remove("_active-link");
                }));
            }));
        }
        const options = {
            root: null,
            margin: 0,
            threshold: .5
        };
        const observer = new IntersectionObserver(callback, options);
        sections.forEach((section => {
            observer.observe(section);
        }));
    }
    const FLS = message => {
        setTimeout((() => window.FLS ? console.log(message) : null), 0);
    };
    window["FLS"] = true;
    //!Функціонал
        isWebp();
    menuInit();
    formSubmit();
    addLoadedClass();
    window.addEventListener("load", (() => {
        windowLoad;
    }));
})();