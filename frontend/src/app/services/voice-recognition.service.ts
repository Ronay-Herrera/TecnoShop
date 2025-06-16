import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {
  recognition: any;
  isListening = false;

  constructor(private ngZone: NgZone) {
    const { webkitSpeechRecognition }: IWindow = window as any;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'es-ES';
  }

  startRecognition(): void {
    this.isListening = true;
    this.recognition.start();
  }

  stopRecognition(): void {
    this.isListening = false;
    this.recognition.stop();
  }

  onResult(callback: (transcript: string) => void): void {
    this.recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');
      this.ngZone.run(() => callback(transcript));
    };
  }
}

interface IWindow extends Window {
  webkitSpeechRecognition: any;
}
