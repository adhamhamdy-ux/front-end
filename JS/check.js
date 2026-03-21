      const teamMembers = [
        {
          name: "Adham hamdy amin",
          role: "CEO & Co-Founder",
          bio: "",
          img: "",
        },
        {
          name: "Omar hussein",
          role: "CEO & Co-Founder",
          bio: "",
          img: "",
        },
        {
          name: "Omar khaled abdelwahab",
          role: "CTO & Co-Founder",
          bio: "",
          img: "",
        },
        {
          name: "mohamed mohsen",
          role: "",
          bio: "",
          img: "",
        },
        {
          name: "motaasem ekramy",
          role: "",
          bio: "",
          img: "",
        },
        {
          name: "youssef mohamed anwar",
          role: "",
          bio: "",
          img: "",
        },
      ];

      const partnerNames = [
        "AL AHLY SC",
        "ZAMALEK SC",
        "CAIRO OPERA",
        "FOUR SEASONS",
        "W HOTELS",
        "NUSR-ET",
        "CITYSTARS",
        "NOBU CAIRO",
      ];

      function renderTeam() {
        document.getElementById("teamGrid").innerHTML = teamMembers
          .map(
            (m) => `
    <div class="team-card">
      <div class="team-img"><img src="${m.img}" alt="${m.name}" loading="lazy"></div>
      <div class="team-body">
        <div class="team-name">${m.name}</div>
        <div class="team-role">${m.role}</div>
        <div class="team-bio">${m.bio}</div>
      </div>
    </div>`,
          )
          .join("");
      }

      function renderTimeline() {
        document.getElementById("timeline").innerHTML = timelineData
          .map(
            (t) => `
    <div class="tl-item">
      <div class="tl-dot"></div>
      <div class="tl-year">${t.year}</div>
      <div class="tl-title">${t.title}</div>
      <div class="tl-desc">${t.desc}</div>
    </div>`,
          )
          .join("");
      }

      function renderPartners() {
        document.getElementById("partnersRow").innerHTML = partnerNames
          .map(
            (p) => `
    <div class="partner-logo">${p}</div>`,
          )
          .join("");
      }

      function handleContact(e) {
        e.preventDefault();
        alert("✅ Message sent! We'll get back to you within 24 hours.");
      }

      renderTeam();
      renderTimeline();
      renderPartners();

      document.querySelectorAll(".nav-links a, .logo").forEach((a) => {
        a.addEventListener("click", function (e) {
          const href = this.getAttribute("href");
          if (!href || href.startsWith("#") || href.startsWith("javascript"))
            return;
          e.preventDefault();
          document.body.style.transition =
            "opacity 0.22s ease, transform 0.22s ease";
          document.body.style.opacity = "0";
          document.body.style.transform = "translateY(-8px)";
          setTimeout(() => {
            location.href = href;
          }, 230);
        });
      });

      // Profile and Sign In State Management
      document.addEventListener("DOMContentLoaded", () => {
        const isSignedIn = localStorage.getItem("signedIn") === "true";
        const signInLink = document.getElementById("signInLink");
        const profileDropdownBtn = document.getElementById("profileDropdownBtn");
        const myTicketsLink = document.getElementById("myTicketsLink");

        if (isSignedIn) {
          if (signInLink) signInLink.style.display = "none";
          if (profileDropdownBtn) profileDropdownBtn.style.display = "block";
          if (myTicketsLink) {
            myTicketsLink.href = "#";
            const btn = myTicketsLink.querySelector("button");
            btn?.removeAttribute("onclick");
            if (btn) btn.onclick = () => alert("Redirecting to My Tickets...");
          }
        } else {
          if (signInLink) signInLink.style.display = "block";
          if (profileDropdownBtn) profileDropdownBtn.style.display = "none";
        }

        // Close dropdown when clicking outside
        document.addEventListener("click", (e) => {
          const popup = document.getElementById("profilePopup");
          const profileBtn = document.getElementById("profileDropdownBtn");
          if (
            popup &&
            popup.classList.contains("active") &&
            profileBtn &&
            !profileBtn.contains(e.target)
          ) {
            popup.classList.remove("active");
          }
        });
      });

      function toggleProfilePopup(e) {
        e.stopPropagation();
        const popup = document.getElementById("profilePopup");
        if (popup) popup.classList.toggle("active");
      }

      function signOut(e) {
        e.preventDefault();
        localStorage.removeItem("signedIn");
        window.location.reload();
      }

      // Modal state
      let currentEvent = null;
      let selectedTicketIdx = 0;
      let qty = 1;
      let paymentMethod = "card";

      function setPaymentDetails(method) {
        paymentMethod = method;
        const wrap = document.getElementById("paymentDetails");
        if (!wrap) return;
        if (method === "card") {
          wrap.innerHTML = `
            <div class="field full">
              <label>Name on card</label>
              <input type="text" id="cardName" placeholder="Full name">
            </div>
            <div class="field full">
              <label>Card number</label>
              <input type="text" id="cardNumber" inputmode="numeric" placeholder="1234 5678 9012 3456" maxlength="19">
            </div>
            <div class="field">
              <label>Expiry</label>
              <input type="text" id="cardExpiry" placeholder="MM/YY" maxlength="5">
            </div>
            <div class="field">
              <label>CVV</label>
              <input type="text" id="cardCvv" inputmode="numeric" placeholder="123" maxlength="3">
            </div>
          `;
          document
            .getElementById("cardNumber")
            ?.addEventListener("input", function (e) {
              let val = this.value.replace(/\\D/g, "");
              val = val.substring(0, 16);
              let parts = [];
              for (let i = 0; i < val.length; i += 4) {
                parts.push(val.substring(i, i + 4));
              }
              this.value = parts.join(" ");
            });
          document
            .getElementById("cardExpiry")
            ?.addEventListener("input", function (e) {
              let val = this.value.replace(/\\D/g, "");
              val = val.substring(0, 4);
              if (val.length >= 3) {
                this.value = val.substring(0, 2) + "/" + val.substring(2);
              } else {
                this.value = val;
              }
            });
          return;
        }
        if (method === "vodafone") {
          wrap.innerHTML = `
            <div class="field full">
              <label>Vodafone Cash number</label>
              <input type="tel" id="vfNumber" placeholder="01xxxxxxxxx" maxlength="11">
            </div>
            <div class="payment-note">You will receive a payment request after confirming.</div>
          `;
          return;
        }
        if (method === "fawry") {
          wrap.innerHTML = `
            <div class="field full">
              <label>Mobile number (for receipt)</label>
              <input type="tel" id="fawryMobile" placeholder="01xxxxxxxxx" maxlength="11">
            </div>
            <div class="payment-note">A Fawry reference code will be generated after confirming.</div>
          `;
          return;
        }
        wrap.innerHTML = `<div class="payment-note">Pay at the venue before entry. Keep your booking confirmation.</div>`;
      }

      function openModal(ev) {
        currentEvent = ev;
        selectedTicketIdx = 0;
        qty = 1;
        document.getElementById("modalTitle").textContent = ev.name;
        document.getElementById("modalSubtitle").textContent =
          (ev.date || "") + (ev.location ? " · " + ev.location : "");
        const opts = document.getElementById("ticketOptions");
        opts.innerHTML = (ev.tickets || [])
          .map(
            (t, i) => `
          <div class="ticket-option ${i === 0 ? "selected" : ""}" onclick="selectTicket(${i})">
            <div>
              <div class="ticket-type">${t.type}</div>
              <div class="ticket-perks">${t.perks}</div>
            </div>
            <div class="ticket-right">
              <div class="ticket-price-tag">EGP ${t.price}</div>
            </div>
          </div>
        `,
          )
          .join("");
        document.getElementById("qtyNum").textContent = qty;
        updateTotal();
        const selected = document.querySelector(
          'input[name="paymentMethod"]:checked',
        );
        setPaymentDetails(selected ? selected.value : "card");
        document.getElementById("modalOverlay").classList.add("open");
      }

      function selectTicket(idx) {
        selectedTicketIdx = idx;
        document.querySelectorAll(".ticket-option").forEach((el, i) => {
          el.classList.toggle("selected", i === idx);
        });
        updateTotal();
      }

      function changeQty(delta) {
        qty = Math.max(1, Math.min(10, qty + delta));
        document.getElementById("qtyNum").textContent = qty;
        updateTotal();
      }

      function updateTotal() {
        if (!currentEvent || !currentEvent.tickets || !currentEvent.tickets.length) {
          document.getElementById("totalAmount").textContent = "EGP 0";
          return;
        }
        const price = currentEvent.tickets[selectedTicketIdx].price * qty;
        document.getElementById("totalAmount").textContent =
          "EGP " + price.toLocaleString();
      }

      function closeModal(e) {
        if (!e || e.target === document.getElementById("modalOverlay") || e.target.classList.contains("modal-close") || e.target.tagName === 'BUTTON') {
          if (e && e.target.tagName === 'BUTTON' && !e.target.classList.contains("modal-close")) return;
          document.getElementById("modalOverlay").classList.remove("open");
        }
      }

      function confirmBooking() {
        if (
          !currentEvent ||
          !currentEvent.tickets ||
          !currentEvent.tickets.length
        ) {
          alert("Sign in to view your tickets.");
          document.getElementById("modalOverlay").classList.remove("open");
          return;
        }
        const t = currentEvent.tickets[selectedTicketIdx];
        const total = (t.price * qty).toLocaleString();
        const method = paymentMethod || "card";

        if (method === "card") {
          const name = (
            document.getElementById("cardName")?.value || ""
          ).trim();
          const number = (
            document.getElementById("cardNumber")?.value || ""
          ).replace(/\\s+/g, "");
          const expiry = (
            document.getElementById("cardExpiry")?.value || ""
          ).trim();
          const cvv = (document.getElementById("cardCvv")?.value || "").trim();
          if (
            !name ||
            number.length < 12 ||
            expiry.length < 4 ||
            cvv.length !== 3
          ) {
            alert(
              "Please enter valid card details.\\n\\n- Name on card\\n- Card number (at least 12 digits)\\n- Expiry (MM/YY)\\n- 3-digit CVV",
            );
            return;
          }
        } else if (method === "vodafone") {
          const vf = (document.getElementById("vfNumber")?.value || "").trim();
          if (!vf || vf.length !== 11) {
            alert("Please enter a valid 11-digit Vodafone Cash number.");
            return;
          }
        } else if (method === "fawry") {
          const m = (
            document.getElementById("fawryMobile")?.value || ""
          ).trim();
          if (!m || m.length < 10) {
            alert("Please enter your mobile number (at least 10 digits).");
            return;
          }
        }

        const methodLabel =
          method === "card"
            ? "Card"
            : method === "vodafone"
              ? "Vodafone Cash"
              : method === "fawry"
                ? "Fawry"
                : "Cash";

        var message =
          "Booking Confirmed!" +
          "\\r\\n\\r\\n" +
          currentEvent.name +
          "\\r\\n" +
          t.type +
          " × " +
          qty +
          "\\r\\n" +
          "Total: EGP " +
          total +
          "\\r\\n" +
          "Payment: " +
          methodLabel +
          "\\r\\n\\r\\n" +
          "A confirmation will be sent to your email.";

        alert(message);
        document.getElementById("modalOverlay").classList.remove("open");
      }

      // Add payment method listener to about.html
      document.addEventListener("DOMContentLoaded", () => {
        document
          .getElementById("paymentMethods")
          ?.addEventListener("change", (e) => {
            if (e.target && e.target.name === "paymentMethod")
              setPaymentDetails(e.target.value);
          });
      });
