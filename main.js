// variables
      const h2 = document.querySelector("h2"),
        container = document.querySelector(".container"),
        add = document.querySelector(".add"),
        remove = document.querySelector(".remove"),
        reset = document.querySelector(".reset"),
        code = document.querySelector(".code");
      let inputs = document.querySelectorAll('input[type="color"]'),
        realInputs = [...inputs];
      let arrayOfColors = [],
        gradientValues;

      // get values
      const refresh = () => {
        inputs = document.querySelectorAll('input[type="color"]');
        realInputs = [...inputs];
      };
      const getValues = () => {
        refresh();
        arrayOfColors = [];
        for (let i = 0; i < realInputs.length; i++) {
          arrayOfColors[arrayOfColors.length] = realInputs[i].value;
          realInputs[i].setAttribute("data-color", realInputs[i].value);
        }
        gradientValues = arrayOfColors.join(",");
        revGradientValues = arrayOfColors.reverse().join(",");
        arrayOfColors.reverse();
      };

      // make gradient
      const excute = () => {
        getValues();
        document.body.style.backgroundImage = `linear-gradient(to right, ${gradientValues} )`;
        h2.style.backgroundImage = `linear-gradient(to right, ${revGradientValues} )`;
        code.innerHTML = document.body.style.backgroundImage;
        save();
      };

      const orders = () => {
        document.body.style.backgroundImage = `linear-gradient(to right, ${gradientValues} )`;
        h2.style.backgroundImage = `linear-gradient(to right, ${revGradientValues} )`;
        code.innerHTML = document.body.style.backgroundImage;
      };
      // changing
      const notice = () => {
        for (let i = 0; i < realInputs.length; i++) {
          realInputs[i].addEventListener("input", excute);
        }
      };

      // add color >> get values make gradient

      const createItem = () => {
        let newColor = document.createElement("input");
        newColor.setAttribute("type", "color");
        newColor.setAttribute("data-color", newColor.value);
        container.appendChild(newColor);
      };

      const createColor = () => {
        createItem();
        excute();
        notice();
      };

      // remove color >> get values make gradient
      const removeColor = () => {
        refresh();
        if (realInputs.length > 2) {
          document.querySelector(".container input:last-child").remove();
          arrayOfColors = [];
          getValues();
          excute();
        }
      };

      const resetDefaults = () => {
        for (let i = 0; realInputs.length > 2; i++) {
          removeColor();
        }
        localStorage.clear();
        realInputs[0].setAttribute("data-color", "#ffffff");
        realInputs[1].setAttribute("data-color", "#000000");
        realInputs[0].value = realInputs[0].getAttribute("data-color");
        realInputs[1].value = realInputs[1].getAttribute("data-color");
        excute();
      };
      const save = () => {
        localStorage.clear();
        for (let i = 0; i < realInputs.length; i++) {
          localStorage.setItem(`color${i}`, `${arrayOfColors[i]}`);
        }
      };
      const createMissing = () => {
        if (localStorage.length > 2) {
          for (let i = 0; i < localStorage.length - 2; i++) {
            createItem();
            notice();
          }
        }
      };

      const lastSession = () => {
        arrayOfColors = [];
        createMissing();
        for (let i = 0; i < localStorage.length; i++) {
          arrayOfColors[arrayOfColors.length] = localStorage.getItem(
            `color${i}`
          );
          refresh();
          realInputs[i].setAttribute(
            "data-color",
            localStorage.getItem(`color${i}`)
          );
          realInputs[i].value = localStorage.getItem(`color${i}`);
        }
        gradientValues = arrayOfColors.join(",");
        revGradientValues = arrayOfColors.reverse().join(",");
        orders();
      };

      if (localStorage.length != 0) {
        lastSession();
      } else {
        getValues();
      }
      notice();
      add.addEventListener("click", createColor);
      remove.addEventListener("click", removeColor);
      reset.addEventListener("click", resetDefaults);
