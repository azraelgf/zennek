(() => {
    "use strict";
    let addWindowScrollEvent = false;
    setTimeout(() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", function(e) {
                document.dispatchEvent(windowScroll);
            });
        }
    }, 0);
    function splitByN(input, n = 10) {
        n = Number(n);
        if (!Number.isFinite(n) || n <= 0) n = 10;
        const clean = String(input).replace(/\s+/g, "");
        const parts = clean.match(new RegExp(`.{1,${n}}`, "g")) || [];
        return parts.join(" ");
    }
    window.addEventListener("load", () => {
        if (document.querySelector(".info-detail__serial-num")) document.querySelectorAll(".info-detail__serial").forEach(card => {
            const span = card.querySelector(".info-detail__serial-num span");
            const btn = card.querySelector(".info-detail__serial-btn");
            if (!span || !btn) return;
            const chunkSize = Number(span.dataset.chunk) || 10;
            const original = span.textContent.trim();
            const formatted = splitByN(original, chunkSize);
            span.textContent = formatted;
            requestAnimationFrame(() => {
                if (span.scrollHeight <= span.clientHeight) btn.style.display = "none";
            });
            btn.addEventListener("click", () => {
                const expanded = card.classList.toggle("is-expanded");
                btn.setAttribute("aria-expanded", String(expanded));
            });
        });
    });
})();
