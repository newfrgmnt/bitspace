import clsx from 'clsx';
import { ComponentProps, MouseEventHandler, forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Position } from '../../circuit';

export interface ImageEditorProps extends ComponentProps<'div'> {
    imageUrl: string;
}

export const ImageEditor = forwardRef<HTMLDivElement, ImageEditorProps>(({ className, imageUrl, ...props }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastPoint, setLastPoint] = useState<Position>();

    const loadImage = useCallback(
        (image: CanvasImageSource, ctx: CanvasRenderingContext2D) => () => {
            ctx.globalCompositeOperation = 'source-over';
            ctx.drawImage(image, 0, 0);

            ctx.fillStyle = 'red';
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 0;
            ctx.globalCompositeOperation = 'destination-out';
        },
        []
    );

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');

            if (!ctx) return;

            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = imageUrl;
            img.onload = loadImage(img, ctx);
        }
    }, [imageUrl, loadImage]);

    const handleMouseMove: MouseEventHandler = useCallback(
        e => {
            if (!isDrawing || !lastPoint || !canvasRef.current) return;

            const ctx = canvasRef.current.getContext('2d');

            if (!ctx) return;

            var bounds = e.currentTarget.getBoundingClientRect();
            var x = e.clientX - bounds.left;
            var y = e.clientY - bounds.top;

            var currentPoint = { x, y };

            ctx.beginPath();
            ctx.arc(x, y, 50, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            setLastPoint(currentPoint);
        },
        [isDrawing, lastPoint]
    );

    const handleMouseDown: MouseEventHandler = useCallback(
        e => {
            setIsDrawing(true);
            setLastPoint({ x: e.clientX, y: e.clientY });
        },
        [setIsDrawing, setLastPoint]
    );

    const handleMouseUp: MouseEventHandler = useCallback(
        async e => {
            setIsDrawing(false);
            setLastPoint(undefined);

            if (!canvasRef.current) return;

            const ctx = canvasRef.current.getContext('2d');

            if (!ctx) return;

            convertJpgToPng(imageUrl, imageBlob => {
                canvasRef.current?.toBlob(maskBlob => {
                    const formData = new FormData();
                    formData.append('prompt', 'A man with a hat');
                    formData.append('image', imageBlob as Blob);
                    formData.append('mask', maskBlob as Blob);

                    fetch('/api/ai/image_edit', {
                        method: 'POST',
                        body: formData
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                        });
                });
            });
        },
        [setIsDrawing, setLastPoint, imageUrl]
    );

    return (
        <div ref={ref} className={clsx('relative flex flex-col', className)} {...props}>
            <canvas
                ref={canvasRef}
                className="cursor-[url('/brush.svg')_50_50,auto]"
                width={500}
                height={500}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            />
        </div>
    );
});

function convertJpgToPng(jpgUrl: string, callback: BlobCallback) {
    var img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = 500;
        canvas.height = 500;

        var ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);

        // Convert the image to PNG format
        canvas.toBlob(callback, 'image/png');
    };

    img.src = jpgUrl;
}
