#include <Arduino.h>
#include <SPI.h>
#include <MFRC522.h>
#include <EEPROM.h>

#define LED_ON HIGH
#define LED_OFF LOW

#define OPEN HIGH
#define CLOSE LOW

#define greenLed 4
#define redLed 5
#define door 6
#define enterProgramMode 7
#define hardReset 8

byte storedCard[4];
byte readCard[4];
byte masterCard[4];

#define SS_PIN 10
#define RST_PIN 9
MFRC522 mfrc522(SS_PIN, RST_PIN);

void systemInit()
{
  Serial.println(">>>>>> Sistema iniciado");
  Serial.println();
  for (uint8_t i = 0; i < 3; i++)
  {
    digitalWrite(greenLed, LED_ON);
    digitalWrite(redLed, LED_ON);
    delay(100);
    digitalWrite(greenLed, LED_OFF);
    digitalWrite(redLed, LED_ON);
    delay(100);
  }
}

void printCard(byte *card)
{
  Serial.print(card[0]);
  Serial.print(" ");
  Serial.print(card[1]);
  Serial.print(" ");
  Serial.print(card[2]);
  Serial.print(" ");
  Serial.println(card[3]);
}

void printReadCard()
{
  Serial.print(">>>>>> Cartão lido com sucesso com o endereço: ");
  printCard(readCard);
}

void printStoredCard()
{
  Serial.print(">>>>>> Cartão encontrado com sucesso com o endereço: ");
  printCard(storedCard);
}

void printMasterCard()
{
  Serial.print(">>>>>> Cartão MASTER encontrado com sucesso com o endereço: ");
  printCard(masterCard);
}

void flashLed(uint32_t time, uint8_t quantity, uint8_t chosenLed)
{
  for (uint8_t i = 0; i < quantity; i++)
  {
    digitalWrite(chosenLed, LED_ON);
    delay(time);
    digitalWrite(chosenLed, LED_OFF);
    delay(time);
  }
}

void notAMasterCard()
{
  Serial.println(">>>>>> Não é um cartão master.");
  flashLed(100, 3, redLed);
}

void operationError(String error)
{
  Serial.print(">>>>>> Erro ao realizar operação. ");
  Serial.println(error);
  flashLed(200, 3, redLed);
}

void successDelete()
{
  Serial.println(">>>>>> Cartão deletado com sucesso.");
  flashLed(100, 6, greenLed);
}

void successWrite()
{
  Serial.println(">>>>>> Cartão gravado com sucesso.");
  flashLed(200, 3, greenLed);
}

void accessGranted()
{
  Serial.println(">>>>>> Acesso garantido.");
  digitalWrite(door, OPEN);
  digitalWrite(greenLed, LED_ON);
  delay(1000);
  digitalWrite(door, CLOSE);
  digitalWrite(greenLed, LED_ON);
}

void accessDenied()
{
  Serial.println(">>>>>> Acesso negado.");
  digitalWrite(door, CLOSE);
  flashLed(100, 3, redLed);
}

bool compareTwoIDs(byte a[], byte b[])
{
  for (uint8_t i = 0; i < 4; i++)
    if (a[i] != b[i])
      return false;

  return true;
}

bool isInProgramMode()
{
  if (!digitalRead(enterProgramMode))
    return true;

  return false;
}

bool isInHardResetMode()
{
  if (!digitalRead(hardReset))
    return true;

  return false;
}

uint8_t successRead()
{
  if (!mfrc522.PICC_IsNewCardPresent())
    return 0;

  if (!mfrc522.PICC_ReadCardSerial())
    return 0;

  for (uint8_t i = 0; i < 4; i++)
    readCard[i] = mfrc522.uid.uidByte[i];

  printReadCard();

  mfrc522.PICC_HaltA();

  return 1;
}

bool isMaster(byte id[])
{
  return compareTwoIDs(id, masterCard);
}

void readID(uint8_t position)
{
  uint8_t start = (position * 4) + 2;
  for (uint8_t i = 0; i < 4; i++)
    storedCard[i] = EEPROM.read(start + i);
}

void printStore()
{
  Serial.println();
  Serial.println("-------------------------------------------------------");
  Serial.println(">>>>>> Mostrando todas as posições salvas.");
  Serial.print(">>>>>>>>> Número mágico: ");
  Serial.println(EEPROM.read(1));
  printMasterCard();
  Serial.print(">>>>>>>>> Quantidade de cartões cadastrados: ");
  Serial.println(EEPROM.read(0));
  for (uint8_t i = 0; i < EEPROM.read(0); i++)
  {
    readID(i);
    Serial.print(">>>>>>>>> ");
    Serial.print(i);
    Serial.print(" => ");
    printCard(storedCard);
  }
  Serial.println("-------------------------------------------------------");
  Serial.println();
}

boolean compare(uint8_t position)
{
  if (storedCard[position] == 255)
    return true;
  return false;
}

void readAllAndCompare()
{
  Serial.println(">>>>>> Teste de leitura e comparação: ");
  for (uint8_t i = 0; i < EEPROM.read(0); i++)
  {
    readID(i);
    Serial.print(">>>>>>>>> ");
    Serial.print(i);
    Serial.print(" => ");
    Serial.print((compare(0)) ? "OK" : "NO");
    Serial.print(" ");
    Serial.print((compare(1)) ? "OK" : "NO");
    Serial.print(" ");
    Serial.print((compare(2)) ? "OK" : "NO");
    Serial.print(" ");
    Serial.println((compare(3)) ? "OK" : "NO");
  }
}

bool hasPossiblesToWrite()
{
  if (EEPROM.read(0) < 64)
    return true;
  return false;
}

uint8_t findIDSlot(byte id[])
{
  uint8_t numberOfEntries = EEPROM.read(0);
  uint8_t i;
  for (i = 0; i < numberOfEntries; i++)
  {
    readID(i);
    if (compareTwoIDs(id, storedCard))
      return i;
  }

  return i;
}

bool findID(byte id[])
{
  uint8_t numberOfEntries = EEPROM.read(0);
  for (uint8_t i = 0; i < numberOfEntries; i++)
  {
    readID(i);
    if (compareTwoIDs(id, storedCard))
    {
      printStoredCard();
      return true;
    }
  }

  Serial.println(">>>>>> Cartão não encontrado.");
  return false;
}

void writeID(byte id[])
{
  //STORAGE A CARD ID
  Serial.println(">>>>>> Modo de gravação.");

  if (hasPossiblesToWrite())
  {
    uint8_t numberOfEntries = EEPROM.read(0);
    uint8_t start = (numberOfEntries * 4) + 2;

    numberOfEntries++;
    EEPROM.write(0, numberOfEntries);

    for (uint8_t i = 0; i < 4; i++)
      EEPROM.write(start + i, id[i]);

    successWrite();
  }
  else
  {
    Serial.println(">>>>>> Não foi possível gravar. Memória cheia.");
  }
}

void deleteID(byte id[])
{
  Serial.println(">>>>>> Modo de exclusão.");
  if (isMaster(id))
  {
    //NOT REGISTERED CARD
    operationError("É um cartão master.");
  }
  else
  {
    //DELETING CARD
    uint8_t numberOfEntries = EEPROM.read(0);
    uint8_t slot = findIDSlot(id);
    Serial.print(">>>>>> SLOT encontrado: ");
    Serial.println(slot);

    if (slot < numberOfEntries)
    {
      uint8_t start = (slot * 4) + 2;
      uint8_t looping = ((numberOfEntries - slot) * 4);
      numberOfEntries--;
      EEPROM.write(0, numberOfEntries);

      uint8_t i;

      for (i = 0; i < looping; i++)
        EEPROM.write(start + i, EEPROM.read(start + 4 + i));

      for (uint8_t j = 0; j < 4; j++)
        EEPROM.write(start + i + j, 0);

      successDelete();
    }
  }
}

void accessProgramMode()
{
  digitalWrite(redLed, LED_OFF);
  digitalWrite(greenLed, LED_OFF);
  Serial.println(">>>>>> Acessado modo de programação.");
  digitalWrite(redLed, LED_ON);
  bool waitingForACard = true;

  while (waitingForACard)
  {
    if (successRead())
    {
      waitingForACard = false;
      (!findID(readCard)) ? writeID(readCard) : deleteID(readCard);
      printStore();
    }

    if (!isInProgramMode())
    {
      waitingForACard = false;
      digitalWrite(redLed, LED_OFF);
      Serial.println(">>>>>> Saindo do modo de programação.");
    }
  }
}

void hardResetMode()
{
  Serial.print(">>>>>> RESETANDO SISTEMA.");
  EEPROM.write(1, 0);
  asm("jmp 0");
}

void testingEEPROM()
{
  Serial.println(">>>>>> TESTING MODE");
  EEPROM.write(0, 64);
  printStore();
  readAllAndCompare();
}

void setup()
{
  pinMode(greenLed, OUTPUT);
  pinMode(redLed, OUTPUT);
  pinMode(door, OUTPUT);
  pinMode(enterProgramMode, INPUT_PULLUP);
  pinMode(hardReset, INPUT_PULLUP);

  digitalWrite(greenLed, LED_OFF);
  digitalWrite(redLed, LED_OFF);
  digitalWrite(door, CLOSE);

  Serial.begin(9600);
  SPI.begin();
  mfrc522.PCD_Init();

  Serial.println(">>>>>> INIT");

  //IF DON'T HAVE A MASTERCARD CADASTRED
  if (EEPROM.read(1) != 143)
  {
    Serial.println("Sem cartão master registrado");
    bool waitingForACard = true;
    digitalWrite(redLed, LED_ON);
    digitalWrite(greenLed, LED_ON);

    while (waitingForACard)
    {
      if (successRead())
      {
        waitingForACard = false;

        for (uint8_t i = 0; i < 4; i++)
          EEPROM.write(2 + i, readCard[i]);

        EEPROM.write(1, 143);
        EEPROM.write(0, 1);
      }
    }

    digitalWrite(redLed, LED_OFF);
    digitalWrite(greenLed, LED_OFF);
    successWrite();
  }

  for (uint8_t i = 0; i < 4; i++)
    masterCard[i] = EEPROM.read(2 + i);

  printMasterCard();
  systemInit();

  //ENABLE IF IN TEST
  // testingEEPROM();
}

void loop()
{
  if (isInProgramMode())
  {
    Serial.println(">>>>>> Modo de programação. Aguardando cartão MASTER.");
    if (!hasPossiblesToWrite())
      Serial.println(">>>>>> Sem espaço para novos cadastros.");

    while (isInProgramMode())
    {
      digitalWrite(redLed, LED_ON);
      digitalWrite(greenLed, LED_ON);

      if (!hasPossiblesToWrite())
        flashLed(300, 1, redLed);

      if (successRead())
      {
        (isMaster(readCard)) ? accessProgramMode() : notAMasterCard();
        Serial.println(">>>>>> Modo de programação. Aguardando cartão MASTER.");
      }
    }
  }
  else if (isInHardResetMode())
    hardResetMode();
  else if (successRead())
    (findID(readCard)) ? accessGranted() : accessDenied();

  digitalWrite(redLed, LED_OFF);
  digitalWrite(greenLed, LED_OFF);
}