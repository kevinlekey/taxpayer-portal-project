class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    greet() {
      const greetingMessage = this.createChatBotMessage("Welcome to TRAgpt! How can I assist you today?");
      this.updateChatbotState(greetingMessage);
    }
  
    handleTINApplication() {
      const message = this.createChatBotMessage(
        "To apply for a TIN or check status of your application, please click the 'Apply for TIN'.");
      this.updateChatbotState(message);
    }

    handleRegisterTaxpayer() {
      const message = this.createChatBotMessage(
        "To register as a taxpayer, please click the 'Register Taxpayer'.");
      this.updateChatbotState(message);
    }

    handleDashboardPage() {
      const message = this.createChatBotMessage(
        "To access our services, please ensure that you have a TIN and have registered a taxpayers account in the portal and click 'Login'.");
      this.updateChatbotState(message);
    }
  
    updateChatbotState(message) {
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    }
  }
  
  export default ActionProvider;
  