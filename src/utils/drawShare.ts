export default class draw {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    init() {
        this.canvas = document.createElement('canvas')
        this.canvas.width = 1624;
        this.canvas.height = 750;
        this.ctx = this.canvas.getContext('2d')
    }

    drawImg(img: HTMLImageElement, x: number, y: number, width?: number, height?: number) {
        if (width && height) {
            this.ctx.drawImage(img, x, y, width, height)
        } else {
            this.ctx.drawImage(img, x, y)
        }
    }

    drawText( text: string, x: number, y: number, type: string, font?: string) {
        // this.ctx.fillStyle = type === 'haha' ? '#872222' : '#814903';
        this.ctx.fillStyle = type === 'ha' && '#872222'
        this.ctx.fillStyle = type === 'liu' && '#814903'
        this.ctx.fillStyle = type === 'null' && '#b8b8b8'
        this.ctx.font = font || 'normal 32px Arial';
        this.ctx.fillText(text, x, y);
    }

    drawCenterText( text: string, x: number, y: number, font?: string) {
       
        
        this.ctx.fillStyle = '#460b0c';
        this.ctx.font = font || 'normal 32px Arial';
        let centerX = this.ctx.measureText(text).width / 2
        console.log('文字宽度', centerX);
        this.ctx.fillText(text, x - centerX, y);
    }

    exportImg() {
        return this.canvas.toDataURL('image/jpeg');
    }
}