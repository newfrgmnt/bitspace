import { Input, Node, Output } from '@bitspace/circuit';

import { NodeType } from '../../types';
import { BooleanSchema, MediaStreamSchema } from '@bitspace/schemas';
import { Observable, from, switchMap, tap } from 'rxjs';

export class Webcam extends Node {
    static displayName = 'Webcam';
    static type = NodeType.WEBCAM;

    inputs = {
        audio: new Input({
            name: 'Audio',
            type: BooleanSchema(),
            defaultValue: true
        })
    };

    outputs = {
        output: new Output({
            name: 'Output',
            type: MediaStreamSchema(),
            observable: this.inputs.audio.pipe(
                tap(this.disposeMediaStream.bind(this)),
                switchMap(this.initializeWebcam.bind(this)),
                tap(this.saveMediaStream.bind(this))
            )
        })
    };

    mediaStream: MediaStream | null = null;

    /** Initializes webcam resources */
    public initializeWebcam(audio: boolean): Observable<MediaStream> {
        return from(
            navigator.mediaDevices.getUserMedia({
                video: {
                    width: { min: 480, ideal: 720, max: 1080 },
                    height: { min: 480, ideal: 720, max: 1080 }
                },
                audio
            })
        );
    }

    /** Saves the media stream internally */
    public saveMediaStream(mediaStream: MediaStream): void {
        this.mediaStream = mediaStream;
    }

    /** Disposes webcam resources */
    public disposeMediaStream(): void {
        if (this.mediaStream) {
            this.mediaStream.getTracks().forEach(track => {
                track.stop();
                this.mediaStream?.removeTrack(track);
            });
        }

        this.mediaStream = null;
    }

    /** Disposes webcam node */
    public dispose(): void {
        this.disposeMediaStream();

        super.dispose();
    }
}
