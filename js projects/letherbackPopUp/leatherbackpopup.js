class LeatherbackPopUp {
  constructor({ ...options }) {
    this.options = options;

    // transaction label
    this.label = options.label || "leatherback";
    this.callback = options.callback;
    this.paymentStatus = undefined;
    this.interval = undefined;
  }

  //   generate pop up handler
  generatePaymentPopUp() {
    const transactionData = {
      currencyCode: this.options.currencyCode,
      amount: this.options.amount,
      name: this.options.label,
      key: this.options.key,
      customerName: this.options.customerName,
      isInternal: this.options.isInternal,
      customerEmail: this.options.customerEmail,
      personalInformationFlag: this.options.showPersonalInformation,
      reference: this.options.reference,
    };
    const transactionDataPara = JSON.stringify({ ...transactionData });
    const encodedData = btoa(encodeURI(transactionDataPara));
    // console.log(
    //   encodedData,

    //   "::::: transactionDataPara :::::"
    // );
    // create pop up iframe wrapper
    const leatherBackIframeWrapper = document.createElement("div");

    const leatherBackIframeWrapperContent = document.createElement("div");

    // create pop up iframe
    const leatherBackIframe = document.createElement("iframe");

    const leatherBackIframeCloseBtn = document.createElement("button");

    // const leatherBackIframeCloseBtnIcon = document.createElement("svg");

    // const leatherBackIframeCloseBtnIconImage = document.createElement("img");

    // construct popup wrapper element
    leatherBackIframeWrapper.setAttribute("id", this.label + "_popup__wrapper");
    leatherBackIframeWrapper.setAttribute("allow", "geolocation");
    leatherBackIframeWrapper.style.position = "fixed";
    leatherBackIframeWrapper.style.top = "0%";
    leatherBackIframeWrapper.style.right = "0%";
    leatherBackIframeWrapper.style.zIndex = 9999999;
    leatherBackIframeWrapper.style.display = "flex";
    leatherBackIframeWrapper.style.justifyContent = "center";
    leatherBackIframeWrapper.style.alignItems = "center";
    leatherBackIframeWrapper.style.width = "100%";
    leatherBackIframeWrapper.style.height = "100%";
    leatherBackIframeWrapper.style.background = "rgba(0,0,0,0.6)";

    // construct popup wrapper content element
    leatherBackIframeWrapperContent.setAttribute(
      "id",
      this.label + "_popup__wrapper___content"
    );
    leatherBackIframeWrapperContent.style.position = "relative";
    leatherBackIframeWrapperContent.style.width = "550px";
    leatherBackIframeWrapperContent.style.height = "700px";

    // construct popup element
    leatherBackIframe.setAttribute("id", this.label + "_popup");
    leatherBackIframe.style.background = "transparent";
    leatherBackIframe.style.padding = "20px 0px";
    leatherBackIframe.style.border = "0px";
    leatherBackIframe.style.borderRadius = "10px";
    leatherBackIframe.style.width = "100%";
    leatherBackIframe.style.height = "100%";
    // leatherBackIframe.style.boxShadow = "-1px 1px 199px -76px rgba(0,0,0,0.84)";

    leatherBackIframe.setAttribute(
      "src",
      `https://pay.leatherback.co/popup/` + encodedData
    );

    // construct popup close Btn
    leatherBackIframeCloseBtn.setAttribute(
      "id",
      this.label + "_popup__closebtn"
    );
    leatherBackIframeCloseBtn.style.background = "#fff";
    leatherBackIframeCloseBtn.style.boxShadow =
      "-1px 1px 199px -76px rgba(0,0,0,0.84)";
    leatherBackIframeCloseBtn.style.border = "0px";
    leatherBackIframeCloseBtn.style.borderRadius = "100%";
    leatherBackIframeCloseBtn.style.width = "40px";
    leatherBackIframeCloseBtn.style.height = "40px";
    leatherBackIframeCloseBtn.style.position = "absolute";
    leatherBackIframeCloseBtn.style.top = "-55px";
    leatherBackIframeCloseBtn.style.right = 0;
    leatherBackIframeCloseBtn.style.cursor = "pointer";
    leatherBackIframeCloseBtn.style.boxShadow =
      "-1px 1px 199px -36px rgba(0,0,0,0.84)";
    leatherBackIframeCloseBtn.setAttribute(
      "src",
      `https://pay.leatherback.co/popup/` + encodedData
    );
    leatherBackIframeCloseBtn.appendChild(document.createTextNode("X"));

    // leatherBackIframeCloseBtn.addEventListener("onClick", close);

    // append popup close to popup wrapper element content
    leatherBackIframeWrapperContent.appendChild(leatherBackIframeCloseBtn);

    // append popup to popup wrapper element content
    leatherBackIframeWrapperContent.appendChild(leatherBackIframe);

    // append popup wrapper element content to popup wrapper element
    leatherBackIframeWrapper.appendChild(leatherBackIframeWrapperContent);

    // append popup wrapper to body element
    document.body.appendChild(leatherBackIframeWrapper);

    // call setCloseHandler;
    // this.setCloseHandler.call();
    const element = document.getElementById(this.label + "_popup__closebtn");

    const newLeatherBack = new LeatherbackPopUp(this.options);

    // add click event listener to close element
    element.addEventListener("click", function () {
      newLeatherBack.successHandler();
    });

    this.interval = setInterval(() => {
      // const { status, message } = window.paymentStatus;

      if (
        window.paymentStatus &&
        window.paymentStatus.status === "SUCCESSFUL"
      ) {
        const newLeatherBack = new LeatherbackPopUp(this.options);

        newLeatherBack.callback();

        clearInterval(this.interval);
      }
    }, 1000);

    setTimeout(() => {
      window.paymentStatus = {
        status: "SUCCESSFUL",
        message: "successful transaction",
      };
    }, 5000);
  }

  // statusIntervalFunc(options) {
  //   // const { status, message } = window.paymentStatus;

  //   if (window.paymentStatus && window.paymentStatus.status === "SUCCESSFUL") {
  //     console.log(status, ":::: status ::::");
  //     console.log(options, ":::: this.options :::::");
  //     const newLeatherBack = new LeatherbackPopUp(options);
  //     newLeatherBack.callback();
  //     clearInterval(this.myInterval);
  //   }
  // }

  // set close popup handler
  setCloseHandler() {
    const element = document.getElementById(this.label + "_popup__closebtn");

    const newLeatherBack = new LeatherbackPopUp();

    // add click event listener to close element
    element.addEventListener("click", function () {
      newLeatherBack.closeHandler();
    });
  }

  // close popup handler
  closeHandler() {
    const popUpElement = document.getElementById(
      this.label + "_popup__wrapper"
    );

    // check if element exist and remove element
    if (popUpElement) {
      document.body.removeChild(popUpElement);
    }
  }

  // check if value passed is a function
  isFunction(functionToCheck) {
    return (
      functionToCheck &&
      {}.toString.call(functionToCheck) === "[object Function]"
    );
  }

  successHandler(data) {
    // check if client passed a function
    const isFunctionValid = this.isFunction(this.options.onSuccess);

    // if function is valid close popup and execute function
    if (isFunctionValid) {
      this.closeHandler.call(this);
      this.options.onSuccess.call(this, data);
    }
  }

  // callback functions to be triggered at the end of a successful transaction
  callback() {
    // check if client passed a function
    const isFunctionValid = this.isFunction(this.options.callback);

    // if function is valid close popup and execute function
    if (isFunctionValid) {
      this.closeHandler.call(this);
      this.options.callback.call(this, data);
    }
  }

  // error handler
  error(data) {
    // check if client passed a function
    const isFunctionValid = this.isFunction(this.options.error);

    // if function is valid close popup and execute function
    if (isFunctionValid) {
      this.closeHandler.call(this);
      this.options.error.call(this, data);
    }
  }
}
