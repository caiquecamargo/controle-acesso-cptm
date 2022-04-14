#include "accessController/AccessController.h"

UserService userServiceAC;
RFID rfid;

AccessController::AccessController() :
  Log("AccessController")
  {};

void AccessController::grant(User grantedUser) {
  Log::logS("AccessControler", "Granting access to " + grantedUser.name + " with cardId " + grantedUser.cardId);
  IO::set(STATE_LED, ON_STATE);
  IO::set(RELAY, ON_STATE);

  vTaskDelay(3000 / portTICK_PERIOD_MS);

  IO::set(STATE_LED, OFF_STATE);
  IO::set(RELAY, OFF_STATE);
};

void AccessController::deny(std::string id) {
  Log::logS("AccessControler", "Access denied to card " + id);
  IO::blink(STATE_LED, 5, 200);
};

void AccessController::checkCardValidity(std::string id) {
  if (userServiceAC.findById(id)) {
    userServiceAC.resultSet.size() > 0 ? grant(userServiceAC.resultSet[0]) : deny(id); 
  }
};

void AccessController::waitForACard(void *pvParameters) {
  AccessController* accessControler = (AccessController*) pvParameters;
  std::string id;
  while(true) {
    MutexController::take();
    id = rfid.read();
    if (id.compare("") != 0) {
      accessControler->checkCardValidity(id);
    }
    MutexController::give();
    vTaskDelay(10);
  } 
};

void AccessController::init() {
  log("Inicialising access controller...");
  rfid.init();
  userServiceAC.init();
  name = "testando";
  xTaskCreate(AccessController::waitForACard, "WaitForACard", 8192, this, 4, NULL);
};
