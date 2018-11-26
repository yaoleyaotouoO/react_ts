import * as React from 'react';

import Button from '../button';


interface IGalleryPhoto {
    id: number;
    url: string;
}

export interface IGalleryProps {

}

export interface IGalleryState {
    show: boolean;
    photos: IGalleryPhoto[];
}

class Gallery extends React.Component<IGalleryProps, IGalleryState>{
    constructor(props: IGalleryProps) {
        super(props);

        this.state = {
            show: false,
            photos: [{
                id: 1,
                url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540877139666&di=ce469ad1b92d75de62938bb601e550be&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F8435e5dde71190efc4e569fac41b9d16fdfa60fd.jpg'
            }, {
                id: 2,
                url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540877218385&di=c370769d931935f1745dc9746d8da799&imgtype=0&src=http%3A%2F%2Fwww.qqzhi.com%2Fuploadpic%2F2014-10-04%2F055346242.jpg'
            }, {
                id: 3,
                url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1540867144&di=f3961f34f50bc3cc8f9e0fd4d86ee860&src=http://p3.qhimg.com/t014b794faac9d87657.jpg'
            }, {
                id: 4,
                url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540877268892&di=699f39b5048c43347b154f7aa3d1971e&imgtype=0&src=http%3A%2F%2Fp8.qhimg.com%2Ft017db9b916c2fbae0a.jpg'
            }]
        }
    }


    toggleAnimate = () => {

    }

    render() {
        const { show, photos } = this.state;

        return <div>
            <Button onClick={() => this.toggleAnimate()}>toggle animate</Button>
        </div>;
    }
}

export default Gallery;