import * as L$1 from 'leaflet';
import { LatLngBounds, Point, Map, Layer } from 'leaflet';
import chroma from 'chroma-js';
import { Subject } from 'rxjs';

declare class MapMatrix {
    array: Float32Array;
    constructor();
    setSize(width: number, height: number): this;
    translateTo(x: number, y: number): this;
    scaleTo(scale: number): this;
}

interface LeafletGlVectorLayerOptions {
    data: {
        latitudes: Float64Array;
        longitudes: Float64Array;
        values: Float64Array;
    };
    plot_type: 'points' | 'grid' | 'swath';
    colorrange: [number, number];
}

interface ICanvasOverlayDrawEvent {
    canvas: HTMLCanvasElement;
    bounds: LatLngBounds;
    offset: Point;
    scale: number;
    size: Point;
    zoomScale: number;
    zoom: number;
}

interface IPoint {
    x: number;
    y: number;
}

declare class DataHelper {
    private layer;
    private sortedData;
    minValue: number;
    currentMinValue: number;
    currentMaxValue: number;
    maxValue: number;
    absoluteCurrentMinValue: number;
    absoluteCurrentMaxValue: number;
    mean: number;
    median: number;
    constructor(layer: LeafletGlVectorLayer);
    updateLimits(limits: {
        min: number;
        max: number;
    }): void;
    getMax(): number;
    getMin(): number;
    getMedian(): number;
    getMean(): number;
    setValue(type: 'currentMinValue' | 'currentMaxValue', value: number): void;
}

declare type IPolygon = [number, number][];
declare type IQuad = [[number, number], [number, number], [number, number], [number, number]];
declare type ITriangle = [[number, number], [number, number], [number, number]];

declare abstract class BaseRenderer {
    private dataHelper;
    vertices: number[];
    numPoints: number;
    canvas: any;
    gl: WebGLRenderingContext | WebGL2RenderingContext;
    program: any;
    mapMatrix: MapMatrix;
    matrix: any;
    abstract map: Map;
    customColorMap: chroma.Scale;
    private vertBuffer;
    private fragmentShader;
    private vertexShader;
    protected vertexValues: number[];
    protected unwrappedGradient: any[][];
    protected colorFidelity: number;
    protected drawType: GLenum;
    private defaultVertexShader;
    private defaultFragmentShader;
    constructor(leafletGlVectorLayerOptions: LeafletGlVectorLayerOptions, canvas: HTMLCanvasElement, map: Map, dataHelper: DataHelper);
    private createShaders;
    protected normalizeValue(value: number): number;
    updateColors(): void;
    bindBuffers(): void;
    setCustomColorMap(colorMap: chroma.Scale): void;
    updateBuffers(): void;
    render(event?: ICanvasOverlayDrawEvent): this;
    protected buildPixel(xy: IPoint, value: number): [number, number, number, number, number, number];
    protected processData(callback?: () => void): void;
    protected cutPolygon(polygon: IPolygon): [IPolygon, IPolygon];
    protected createTrianglesFromPolygons(polygons: IPolygon[]): ITriangle[];
    createTrianglesFromQuad(polygon: IQuad): ITriangle[];
    private static createTrianglesFromPolygon;
    protected addTrianglesToVertices(triangles: ITriangle[], value: number): void;
    private outputPixelFromlatLon;
}

declare class PointsRenderer extends BaseRenderer {
    private data;
    map: Map;
    constructor(leafletGlVectorLayerOptions: LeafletGlVectorLayerOptions, canvas: HTMLCanvasElement, map: Map, dataHelper: DataHelper);
    processData(callback: () => void): void;
}

declare class GridRenderer extends BaseRenderer {
    private data;
    map: Map;
    constructor(leafletGlVectorLayerOptions: LeafletGlVectorLayerOptions, canvas: HTMLCanvasElement, map: Map, dataHelper: DataHelper);
    processData(callback: () => void): void;
}

declare class SwathRenderer extends BaseRenderer {
    private data;
    map: L.Map;
    private index;
    constructor(leafletGlVectorLayerOptions: LeafletGlVectorLayerOptions, canvas: HTMLCanvasElement, map: L.Map, dataHelper: DataHelper);
    processData(callback: () => void): void;
}

interface IColorWrapper {
    value: number;
    color: number[];
}
interface IColorSlider {
    slider: HTMLElement;
    colorWrapper: IColorWrapper;
}

interface IPredefinedColorWrapper {
    value: number;
    color: number[];
}
interface IColorMapWrapper {
    colorWrappers: IPredefinedColorWrapper[];
    colorMapElement: HTMLElement;
    id: string;
}
declare class LeafletGlVectorLayerControl {
    layer: LeafletGlVectorLayer;
    colorWrappers: IColorWrapper[];
    colorSliders: IColorSlider[];
    gradient: chroma.Scale | undefined;
    private map;
    private mapContainer;
    private innerContainer;
    private colorMapContainer;
    private gradientContainer;
    private gradientElement;
    private colorInputContainer;
    private colorInput;
    private normalizingContainer;
    private normalizingContainerInput1;
    private normalizingContainerInput2;
    private gradientStopDeleteButton;
    private normalizingValueContainer;
    private draggedSlider;
    private selectedColorSlider;
    private COLOR_SLIDER_WIDTH;
    private previousStopColor;
    private data;
    subjects: {
        selectedColorSlider: Subject<IColorSlider>;
        colorMapDialog: Subject<boolean>;
        gradient: Subject<chroma.Scale<chroma.Color> | null | undefined>;
        updateLimits: Subject<{
            min: number;
            max: number;
        }>;
    };
    id: string;
    constructor(layer: LeafletGlVectorLayer);
    initialize(map: L$1.Map, mapContainer: HTMLElement): HTMLElement;
    onAdd(): void;
    onSelected(): void;
    initColorWrappers(): void;
    private createColorWrapper;
    initColorSliders(): void;
    onColorMapChange(colorMapWrapper: IColorMapWrapper): void;
    private addEventListeners;
    onColorPickerChange(color: any): void;
    reset(): void;
    onColorPickerDialogClose(reset: boolean): void;
    private deleteExistingSliders;
    private deleteGradientSlider;
    private onNormalizingContainerInputChange;
    private updateNormalizingMarkers;
    private getValueForPercentage;
    private getColorScaleString;
    private updateGradientAndGradientElement;
    private updateGradient;
    private updateGradientElement;
    addNewColor(percentage: number): void;
    private insertColorSlider;
    private getRgbaString;
    private addClickListenerToColorSlider;
    private selectColorSlider;
}

declare class LeafletGlVectorLayerControlWrapper extends L$1.Control {
    private controlWrapperOuterContainer;
    private controlWrapperTabContainer;
    private controlWrapperInnerContainer;
    private controlWrapperContentContainer;
    private toggleButton;
    private toggleButtonInner;
    private resetButton;
    private resetButtonInner;
    private infoButton;
    private infoButtonInner;
    private infoContainer;
    private infoContainerContent;
    private colorPickerDialogButtonContainer;
    private colorPickerDialogCancelButton;
    private colorPickerDialogSubmitButton;
    private colorPickerContainer;
    colorPicker: any;
    controls: LeafletGlVectorLayerControl[];
    private selectedControl;
    private mapContainer;
    private colorMapDropdownContainer;
    private colorMapDropdownToggle;
    private colorMapDropdownToggleInner;
    private colorMapWrappers;
    map: L$1.Map;
    private tabs;
    subjects: {
        control: Subject<LeafletGlVectorLayerControl>;
    };
    constructor();
    addTo(map: L$1.Map): this;
    removeControl(controlToRemove: LeafletGlVectorLayerControl): void;
    removeTab(index: number): void;
    addControl(control: LeafletGlVectorLayerControl, layerName?: string): void;
    private updateColorPicker;
    private getRgbaString;
    private createTab;
    private onTabClicked;
    selectControl(control: LeafletGlVectorLayerControl): void;
    private createColorMapDialog;
    private guidGenerator;
    private createGradientString;
    private createColorMapWrapper;
    private onColorMapClick;
    private addEventListeners;
    private toggleInfoContainer;
    private showColorMapDropdown;
    onRemove(): void;
    private hideDialogs;
    private reset;
    private toggleColorPickerDialog;
}

declare class LeafletGlVectorLayerWrapper extends L.Layer {
    private layers;
    controlWrapper: LeafletGlVectorLayerControlWrapper;
    private selectedLayer;
    map: L.Map;
    constructor();
    onAdd(map: L.Map): this;
    addTo(map: L.Map): this;
    removeLayer(layer: any): this;
    cleanUpControlAndLayerData(layer: any): void;
    addLayer(layer: LeafletGlVectorLayer): this;
    private onLayerSelected;
    private animateLayerOpacity;
}

interface ExtendedOptions extends L.Layer {
    leafletGlVectorLayerOptions: LeafletGlVectorLayerOptions;
}
declare class LeafletGlVectorLayer extends Layer {
    canvas: HTMLCanvasElement;
    _map: any;
    renderer: SwathRenderer | GridRenderer | PointsRenderer | undefined;
    private _paneName;
    dataHelper: DataHelper;
    options: any;
    wrapper: LeafletGlVectorLayerWrapper;
    control: LeafletGlVectorLayerControl;
    _leaflet_id: string;
    id: string;
    private isFirstRun;
    constructor(newOptions: ExtendedOptions);
    onRemove(map: Map): this;
    addTo(map: L.Map): this;
    onAdd(map: Map): this;
    private updateColors;
    private updateRender;
    private updateValues;
    isAnimated(): boolean;
    private _resize;
    private _reset;
    private _redraw;
    private _animateZoom;
    private _animateZoomNoLayer;
    private _unclampedProject;
    private _unclampedLatLngBoundsToNewLayerBounds;
}

export { LeafletGlVectorLayer };
