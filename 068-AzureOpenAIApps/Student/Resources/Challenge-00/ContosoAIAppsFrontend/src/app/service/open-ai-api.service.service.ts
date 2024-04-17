import { Injectable } from '@angular/core';
import {ENVIRONMENT} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LocalStorageService} from "./local.storage.service";
import {GuidService} from "./guid.service";

@Injectable({
  providedIn: 'root'
})
export class OpenAiApiServiceService {

  private static CONVERSATION_ID_KEY = "conversation.id";

  private apiUrl = ENVIRONMENT.apiUrl; // Update with your Node.js server URL

  constructor(private http: HttpClient, private localService: LocalStorageService) { }

  public askElizabeth<T>(message: string) {

    const apiEndpoint: string = `${this.apiUrl}/api/assistants-ask-elizabeth`;

    return this.askAssistant<T>(apiEndpoint, message)
  }

  public askEsther<T>(message: string) {

    const apiEndpoint: string = `${this.apiUrl}/api/assistants-ask-esther`;

    return this.askAssistant<T>(apiEndpoint, message)
  }

  public askMiriam<T>(message: string) {

    const apiEndpoint: string = `${this.apiUrl}/api/assistants-ask-miriam`;

    return this.askAssistant<T>(apiEndpoint, message)
  }

  public askPriscilla<T>(message: string) {

    const apiEndpoint: string = `${this.apiUrl}/api/assistants-ask-priscilla`;

    return this.askAssistant<T>(apiEndpoint, message)
  }

  public askSarah<T>(message: string) {

    const apiEndpoint: string = `${this.apiUrl}/api/assistants-ask-sarah`;

    return this.askAssistant<T>(apiEndpoint, message)
  }

  private askAssistant<T>(apiEndpoint: string, message: string) {

    const clientMessage = {message};

    const conversationIdentifier: string = this.getConversationId() as string;

    const httpHeaders = new HttpHeaders().set('x-conversation-id', conversationIdentifier)

    const requestOptions = {headers : httpHeaders};

    console.log(requestOptions)

    return this.http.post<T>(apiEndpoint, clientMessage, requestOptions);

  }
  public askQuestionsAboutContosoIslands<T>(message: string) {

    const clientMessage = {message};

    const conversationIdentifier: string = this.getConversationId() as string;

    const httpHeaders = new HttpHeaders().set('x-conversation-id', conversationIdentifier)

    const requestOptions = {headers : httpHeaders};

    console.log(requestOptions)

    return this.http.post<T>(`${this.apiUrl}/api/contoso-tourists-basic`, clientMessage, requestOptions);
  }

  public sendLimoChatbotMessage<T>(message: string) {

    const clientMessage = {message};

    return this.http.post<T>(`${this.apiUrl}/api/contoso-limos-chatbot`, clientMessage);
  }

  private getConversationId() {

    const lookupKey = OpenAiApiServiceService.CONVERSATION_ID_KEY;
    let conversationId: string = ""
    if (!this.localService.keyExists(lookupKey)) {
      conversationId = GuidService.generateGuid()
      this.localService.setItem(lookupKey, conversationId)
      return conversationId
    } else {
      return this.localService.getItem(lookupKey)
    }
  }
}
