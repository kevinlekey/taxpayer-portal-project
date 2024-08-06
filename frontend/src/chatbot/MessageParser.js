class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase();
  
      if (lowerCaseMessage.includes("hello")) {
        this.actionProvider.greet();
      }
  
      if (lowerCaseMessage.includes("tin")) {
        this.actionProvider.handleTINApplication();
      }

      if (lowerCaseMessage.includes("taxpayer account")) {
        this.actionProvider.handleRegisterTaxpayer();
      }

      if (lowerCaseMessage.includes("services")) {
        this.actionProvider.handleDashboardPage();
      }
    }
  }
  
  export default MessageParser;
  