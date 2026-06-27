"use client";

import { useEffect } from "react";

const pageHtml = "<header class=\"topbar\">\n    <nav class=\"container nav\" aria-label=\"主导航\">\n      <a class=\"brand\" href=\"#top\" aria-label=\"泡泡尾巴宠物洗护店首页\">\n        <span class=\"brand-mark\"><i data-lucide=\"paw-print\" aria-hidden=\"true\"></i></span>\n        泡泡尾巴\n      </a>\n      <div class=\"nav-links\" id=\"navLinks\">\n        <a href=\"#services\">服务</a>\n        <a href=\"#pricing\">套餐</a>\n        <a href=\"#environment\">环境</a>\n        <a href=\"#process\">流程</a>\n        <a href=\"#booking\">预约</a>\n      </div>\n      <a class=\"primary-button nav-cta\" href=\"#booking\"><i data-lucide=\"calendar-check\" aria-hidden=\"true\"></i>立即预约</a>\n      <button class=\"icon-button menu-toggle\" id=\"menuToggle\" type=\"button\" aria-label=\"展开导航\">\n        <i data-lucide=\"menu\" aria-hidden=\"true\"></i>\n      </button>\n    </nav>\n  </header>\n\n  <main id=\"top\">\n    <section class=\"container hero\">\n      <div>\n        <div class=\"eyebrow\">预约制宠物洗护沙龙</div>\n        <h1>洗得干净，<span class=\"script\">哄得开心。</span></h1>\n        <p class=\"hero-copy\">从基础沐浴到造型修剪，我们用低刺激洗护、独立烘干舱和一宠一消毒流程，让猫猫狗狗在温柔节奏里完成一次舒服的焕新。</p>\n        <div class=\"hero-actions\">\n          <a class=\"primary-button\" href=\"#booking\"><i data-lucide=\"sparkles\" aria-hidden=\"true\"></i>预约洗护</a>\n          <a class=\"secondary-button\" href=\"#pricing\"><i data-lucide=\"list-checks\" aria-hidden=\"true\"></i>查看套餐</a>\n        </div>\n        <div class=\"hero-stats\" aria-label=\"门店数据\">\n          <div class=\"stat\"><strong>4.9</strong><span>门店好评评分</span></div>\n          <div class=\"stat\"><strong>30min</strong><span>到店健康初检</span></div>\n          <div class=\"stat\"><strong>1v1</strong><span>美容师全程照看</span></div>\n        </div>\n      </div>\n      <div class=\"hero-media\" aria-label=\"宠物洗护环境展示\">\n        <div class=\"photo-frame\">\n          <img src=\"https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1400&q=82\" alt=\"干净明亮的宠物洗护门店里，一只狗狗看向镜头\">\n        </div>\n        <div class=\"floating-card\">\n          <div class=\"label\">今日护理重点</div>\n          <strong>换季掉毛、皮肤敏感、指甲过长都可以一起处理。</strong>\n          <p>预约后会先确认宠物体型、毛量和性格，再安排合适的护理时长。</p>\n        </div>\n      </div>\n    </section>\n\n    <section class=\"container\" id=\"services\">\n      <div class=\"section-head\">\n        <h2>把洗护拆成宠物能接受的小步骤。</h2>\n        <p>门店不追求流水线速度。我们更在意情绪稳定、毛发吹透、皮肤不过度刺激，以及主人能清楚知道护理结果。</p>\n      </div>\n      <div class=\"service-grid\" id=\"serviceGrid\" aria-live=\"polite\"></div>\n    </section>\n\n    <section class=\"split-band\" id=\"pricing\">\n      <div class=\"container price-layout\">\n        <div class=\"price-feature\">\n          <h2>透明套餐，不临时加价。</h2>\n          <p>下面价格适用于常规毛量与配合度。严重毛结、特殊体型或医疗级皮肤护理会提前沟通后再确认。</p>\n        </div>\n        <div class=\"price-grid\">\n          <article class=\"price-card\">\n            <div class=\"badge\">轻护理</div>\n            <h3>基础洗香香</h3>\n            <p>适合日常清洁、短毛宠物和洗护习惯稳定的小朋友。</p>\n            <div class=\"price\">¥88 <small>起</small></div>\n            <ul class=\"check-list\">\n              <li><i data-lucide=\"check\" aria-hidden=\"true\"></i>基础沐浴与吹干</li>\n              <li><i data-lucide=\"check\" aria-hidden=\"true\"></i>耳道清洁与指甲修剪</li>\n              <li><i data-lucide=\"check\" aria-hidden=\"true\"></i>脚底毛和肛门腺护理</li>\n            </ul>\n            <a class=\"secondary-button\" href=\"#booking\">选择套餐</a>\n          </article>\n          <article class=\"price-card featured\">\n            <div class=\"badge\">热门选择</div>\n            <h3>全套焕毛护理</h3>\n            <p>适合换季掉毛、长毛蓬松、需要深层梳理的猫狗。</p>\n            <div class=\"price\">¥168 <small>起</small></div>\n            <ul class=\"check-list\">\n              <li><i data-lucide=\"check\" aria-hidden=\"true\"></i>基础洗护全部项目</li>\n              <li><i data-lucide=\"check\" aria-hidden=\"true\"></i>去浮毛与毛结梳理</li>\n              <li><i data-lucide=\"check\" aria-hidden=\"true\"></i>护毛素与皮肤观察记录</li>\n            </ul>\n            <a class=\"primary-button\" href=\"#booking\">选择套餐</a>\n          </article>\n          <article class=\"price-card\">\n            <div class=\"badge\">造型升级</div>\n            <h3>美容修剪</h3>\n            <p>适合需要脸型、身体线条、脚型尾型精修的宠物。</p>\n            <div class=\"price\">¥238 <small>起</small></div>\n            <ul class=\"check-list\">\n              <li><i data-lucide=\"check\" aria-hidden=\"true\"></i>全套洗护与吹造</li>\n              <li><i data-lucide=\"check\" aria-hidden=\"true\"></i>局部或全身造型修剪</li>\n              <li><i data-lucide=\"check\" aria-hidden=\"true\"></i>完成后照片反馈</li>\n            </ul>\n            <a class=\"secondary-button\" href=\"#booking\">选择套餐</a>\n          </article>\n        </div>\n      </div>\n    </section>\n\n    <section class=\"container\" id=\"environment\">\n      <div class=\"section-head\">\n        <h2>店内环境安静明亮，洗护区看得见也闻得到干净。</h2>\n        <p>我们把接待、等候、洗护、吹干和消毒分开安排，让宠物少受干扰，也让主人对护理过程更放心。</p>\n      </div>\n      <div class=\"environment\">\n        <div class=\"environment-gallery\" aria-label=\"店内环境照片\">\n          <figure class=\"environment-photo\">\n            <img src=\"https://images.pexels.com/photos/19145874/pexels-photo-19145874.jpeg?auto=compress&cs=tinysrgb&w=1200\" alt=\"明亮整洁的宠物店接待与休息区域\">\n            <span>明亮接待区</span>\n          </figure>\n          <figure class=\"environment-photo\">\n            <img src=\"https://images.pexels.com/photos/19145881/pexels-photo-19145881.jpeg?auto=compress&cs=tinysrgb&w=900\" alt=\"宠物洗护台和护理用品整齐摆放\">\n            <span>独立洗护台</span>\n          </figure>\n          <figure class=\"environment-photo\">\n            <img src=\"https://images.pexels.com/photos/6816837/pexels-photo-6816837.jpeg?auto=compress&cs=tinysrgb&w=900\" alt=\"宠物在舒适等候区放松休息\">\n            <span>舒适等候位</span>\n          </figure>\n        </div>\n        <div class=\"environment-panel\">\n          <h3>像小型护理沙龙，不像吵闹的临时笼位。</h3>\n          <p>店内使用低气味清洁用品，每组客人离店后会清理台面、浴缸、毛巾和工具。敏感、胆小或第一次洗护的宠物，会优先安排更安静的时段。</p>\n          <ul class=\"environment-list\">\n            <li><i data-lucide=\"waves\" aria-hidden=\"true\"></i><span>干湿分区，洗护区地面防滑，吹干区保持通风。</span></li>\n            <li><i data-lucide=\"spray-can\" aria-hidden=\"true\"></i><span>梳子、剪刀、浴巾按宠物分组清洁，减少交叉接触。</span></li>\n            <li><i data-lucide=\"sofa\" aria-hidden=\"true\"></i><span>等候区提供饮水、牵引挂点和短暂停留座位。</span></li>\n          </ul>\n        </div>\n      </div>\n    </section>\n\n    <section class=\"container\" id=\"process\">\n      <div class=\"section-head\">\n        <h2>第一次来，也能放心交给我们。</h2>\n        <p>从预约到接回，每个节点都尽量明确，让宠物少紧张，也让主人少担心。</p>\n      </div>\n      <div class=\"process-grid\">\n        <article class=\"step\">\n          <h3>线上预约</h3>\n          <p>填写体型、品种、护理需求和可到店时间，门店会确认合适档期。</p>\n        </article>\n        <article class=\"step\">\n          <h3>到店评估</h3>\n          <p>美容师检查毛结、皮肤、耳朵和情绪状态，说明预计时长与注意事项。</p>\n        </article>\n        <article class=\"step\">\n          <h3>分段护理</h3>\n          <p>清洁、梳理、吹干、修剪分段完成，中途会根据宠物状态调整节奏。</p>\n        </article>\n        <article class=\"step\">\n          <h3>接回反馈</h3>\n          <p>交付护理记录，提醒居家梳毛频率、耳道观察和下次建议护理时间。</p>\n        </article>\n      </div>\n    </section>\n\n    <section class=\"container\">\n      <div class=\"section-head\">\n        <h2>主人们最常夸的，是“回来还挺开心”。</h2>\n        <p>我们喜欢漂亮造型，但更喜欢宠物愿意再次走进门店。</p>\n      </div>\n      <div class=\"review-strip\" id=\"reviewStrip\" aria-live=\"polite\"></div>\n    </section>\n\n    <section class=\"container booking\" id=\"booking\">\n      <div class=\"booking-info\">\n        <h2>给毛孩子约个舒服时段。</h2>\n        <p>建议提前一天预约。若宠物有皮肤病、怀孕、术后恢复、强烈应激等情况，请先告知，我们会建议更合适的护理方式。</p>\n        <div class=\"contact-list\">\n          <div class=\"contact-item\"><i data-lucide=\"map-pin\" aria-hidden=\"true\"></i><span>上海市梧桐路 28 号一层</span></div>\n          <div class=\"contact-item\"><i data-lucide=\"clock-3\" aria-hidden=\"true\"></i><span>周一至周日 10:00-20:00</span></div>\n          <div class=\"contact-item\"><i data-lucide=\"phone\" aria-hidden=\"true\"></i><span>021-8888-6616</span></div>\n        </div>\n      </div>\n      <form class=\"booking-form\" id=\"bookingForm\">\n        <div class=\"form-grid\">\n          <label>主人姓名\n            <input type=\"text\" name=\"owner\" placeholder=\"例如：林女士\" required>\n          </label>\n          <label>联系电话\n            <input type=\"tel\" name=\"phone\" placeholder=\"用于确认预约\" required>\n          </label>\n          <label>宠物类型\n            <select name=\"pet\" id=\"petType\">\n              <option value=\"dog\">狗狗</option>\n              <option value=\"cat\">猫猫</option>\n            </select>\n          </label>\n          <label>体型\n            <select name=\"size\" id=\"petSize\">\n              <option value=\"small\">小型</option>\n              <option value=\"medium\">中型</option>\n              <option value=\"large\">大型</option>\n            </select>\n          </label>\n          <label>护理套餐\n            <select name=\"serviceId\" id=\"packageType\" required></select>\n          </label>\n          <label>到店日期\n            <input type=\"date\" name=\"date\" required>\n          </label>\n          <label>希望到店时间\n            <input type=\"time\" name=\"visitTime\" min=\"10:00\" max=\"20:00\" step=\"1800\" required>\n          </label>\n          <label class=\"wide\">备注\n            <textarea name=\"note\" placeholder=\"可以写品种、年龄、毛结情况、是否怕吹风等\"></textarea>\n          </label>\n        </div>\n        <div class=\"form-footer\">\n          <div class=\"estimate\" id=\"estimate\">预估：¥88 起</div>\n          <button class=\"primary-button\" type=\"submit\"><i data-lucide=\"send\" aria-hidden=\"true\"></i>提交预约</button>\n        </div>\n        <div class=\"toast\" id=\"toast\">预约信息已记录，门店会尽快联系确认。</div>\n      </form>\n    </section>\n  </main>\n\n  <footer>\n    <div class=\"container footer-inner\">\n      <span>泡泡尾巴宠物洗护店</span>\n      <span>一宠一消毒 · 预约制服务 · 温和洗护</span>\n    </div>\n  </footer>";

export default function HomePage() {
  useEffect(() => {
    const menuToggle = document.querySelector("#menuToggle");
    const navLinks = document.querySelector("#navLinks");
    const bookingForm = document.querySelector("#bookingForm");
    const serviceGrid = document.querySelector("#serviceGrid");
    const reviewStrip = document.querySelector("#reviewStrip");
    const packageType = document.querySelector("#packageType");
    const petSize = document.querySelector("#petSize");
    const petType = document.querySelector("#petType");
    const estimate = document.querySelector("#estimate");
    const toast = document.querySelector("#toast");

    if (!menuToggle || !navLinks || !bookingForm || !serviceGrid || !reviewStrip || !packageType || !petSize || !petType || !estimate || !toast) {
      return undefined;
    }

    let services = [];
    let toastTimer;
    let disposed = false;

    const sizeAdds = {
      small: 0,
      medium: 50,
      large: 110
    };

    const refreshIcons = () => {
      if (window.lucide?.createIcons) {
        window.lucide.createIcons({ strokeWidth: 2.1 });
      }
    };

    const showToast = (message, isError = false) => {
      window.clearTimeout(toastTimer);
      toast.textContent = message;
      toast.classList.add("show");
      toast.style.color = isError ? "#9a3d32" : "";
      toast.style.background = isError ? "rgba(242, 125, 109, 0.16)" : "";
      toastTimer = window.setTimeout(() => toast.classList.remove("show"), 4200);
    };

    const updateEstimate = () => {
      const selected = services.find((service) => String(service.id) === packageType.value);
      if (!selected) {
        estimate.textContent = "预估：请选择套餐";
        return;
      }
      const catAdd = petType.value === "cat" ? 30 : 0;
      const total = selected.price + sizeAdds[petSize.value] + catAdd;
      estimate.textContent = `预估：¥${total} 起`;
    };

    const renderServices = (items) => {
      serviceGrid.innerHTML = items.map((service) => `
        <article class="service">
          <div class="service-icon"><i data-lucide="${service.icon}" aria-hidden="true"></i></div>
          <h3>${service.title}</h3>
          <p>${service.summary}</p>
        </article>
      `).join("");

      packageType.innerHTML = items
        .map((service) => `<option value="${service.id}">${service.title} · ¥${service.price} 起</option>`)
        .join("");

      updateEstimate();
      refreshIcons();
    };

    const renderReviews = (items) => {
      reviewStrip.innerHTML = items.map((review) => `
        <article class="review">
          <strong>${review.customer_name}</strong>
          <p>${review.content}</p>
        </article>
      `).join("");
    };

    const loadPageData = async () => {
      try {
        const [serviceResponse, reviewResponse] = await Promise.all([
          fetch("/api/services"),
          fetch("/api/reviews")
        ]);

        if (!serviceResponse.ok || !reviewResponse.ok) {
          throw new Error("Failed to load page data");
        }

        services = await serviceResponse.json();
        const reviews = await reviewResponse.json();

        if (disposed) {
          return;
        }

        renderServices(services);
        renderReviews(reviews);
      } catch (error) {
        serviceGrid.innerHTML = '<article class="service"><h3>服务暂时无法加载</h3><p>请稍后刷新页面，或直接电话联系门店。</p></article>';
        reviewStrip.innerHTML = '<article class="review"><strong>评价暂时无法加载</strong><p>请稍后刷新页面查看。</p></article>';
      }
    };

    const handleMenuClick = () => {
      navLinks.classList.toggle("open");
      const expanded = navLinks.classList.contains("open");
      menuToggle.setAttribute("aria-label", expanded ? "收起导航" : "展开导航");
    };

    const handleNavClick = (event) => {
      if (event.target.tagName === "A") {
        navLinks.classList.remove("open");
      }
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(bookingForm).entries());

      try {
        const response = await fetch("/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "预约提交失败");
        }

        showToast(`${result.message} 预估金额：¥${result.estimatedPrice} 起`);
        bookingForm.reset();
        updateEstimate();
      } catch (error) {
        showToast(error.message || "预约提交失败，请稍后再试。", true);
      }
    };

    menuToggle.addEventListener("click", handleMenuClick);
    navLinks.addEventListener("click", handleNavClick);
    packageType.addEventListener("change", updateEstimate);
    petSize.addEventListener("change", updateEstimate);
    petType.addEventListener("change", updateEstimate);
    bookingForm.addEventListener("submit", handleSubmit);

    loadPageData();
    refreshIcons();

    return () => {
      disposed = true;
      window.clearTimeout(toastTimer);
      menuToggle.removeEventListener("click", handleMenuClick);
      navLinks.removeEventListener("click", handleNavClick);
      packageType.removeEventListener("change", updateEstimate);
      petSize.removeEventListener("change", updateEstimate);
      petType.removeEventListener("change", updateEstimate);
      bookingForm.removeEventListener("submit", handleSubmit);
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: pageHtml }} />;
}
