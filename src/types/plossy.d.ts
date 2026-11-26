// Plossy — deklaracje typów publicznego API.
// Opisują to, co udokumentowane: opcje, metody i zdarzenia komponentów oraz obiekt `Plossy`.
// Plik jest utrzymywany ręcznie — po zmianie opcji lub metod komponentu popraw go tutaj.

/** Element albo selektor CSS. */
export type Target = string | Element;

/** Położenie elementów pływających (drop, tooltip, popover…). */
export type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

/** Zdarzenie `pl:*`. W `detail` zawsze jest instancja komponentu, który je wysłał. */
export type PlossyEvent<D = Record<string, any>> = CustomEvent<D & { component: Component<any> }>;

// ── Komponent bazowy ──────────────────────────────────────────────────────

export class Component<O = Record<string, any>> {
  /** Domyślne opcje komponentu. */
  static defaults: Record<string, any>;
  /** Nazwa opcji, do której trafia „goła" wartość atrybutu (np. `data-pl-toggle="#cel"`). */
  static primary: string | null;
  /** Nazwa nadana przy rejestracji (`data-pl-{nazwa}`). */
  static componentName: string;

  constructor(el: Element, options?: Partial<O>);

  readonly el: HTMLElement;
  options: O;

  /** Punkt wejścia komponentu — nadpisywany w klasach potomnych. */
  init(): void;
  /** `addEventListener` z automatycznym sprzątaniem w `destroy()`. Zwraca funkcję odpinającą. */
  on(target: EventTarget | null | undefined, type: string, handler: (event: any) => void, options?: boolean | AddEventListenerOptions): () => void;
  /** Rejestruje funkcję sprzątającą wywoływaną w `destroy()`. */
  onDestroy(fn: () => void): void;
  /** Wysyła zdarzenie `pl:{type}` na elemencie. Zwraca `false`, gdy anulowano je przez `preventDefault()`. */
  emit(type: string, detail?: Record<string, any>, cancelable?: boolean): boolean;
  /** Odpina zdarzenia i usuwa instancję z elementu. */
  destroy(): void;
}

// ── Opcje komponentów ─────────────────────────────────────────────────────

export interface ComboboxItem {
  value: string;
  label?: string;
  disabled?: boolean;
  [key: string]: any;
}

export type NotificationStatus = '' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type NotificationPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface AccordionOptions {
  /** Pozwala otworzyć wiele pozycji naraz. */
  multiple?: boolean;
  /** Pozwala zamknąć wszystkie pozycje. */
  collapsible?: boolean;
  /** Indeks pozycji otwartej na starcie. */
  active?: number | null;
  duration?: number;
}

export interface AlertOptions {
  /** Czas animacji zamykania (ms) */
  duration?: number;
  /** Automatyczne zamknięcie po czasie (ms); 0 = wyłączone. */
  timeout?: number;
  /** Usuwa element z DOM po zamknięciu (false = tylko `hidden`) */
  remove?: boolean;
  selClose?: string;
}

export interface ComboboxOptions {
  placeholder?: string;
  /** Przycisk czyszczenia. */
  clearable?: boolean;
  /** Pozwala dodać własną pozycję. */
  creatable?: boolean;
  /** Filtrowanie przez wpisywanie. */
  search?: boolean;
  /** Wyróżnia dopasowany fragment. */
  highlight?: boolean;
  /** Domyślnie: true dla pojedynczego wyboru. */
  closeOnSelect?: boolean | null;
  /** Lista pozycji (JS) */
  options?: Array<string | ComboboxItem> | string | null;
  /** Funkcja async (q) => [...] lub adres URL (doklejane ?q) */
  source?: string | ((query: string) => ComboboxItem[] | string[] | Promise<ComboboxItem[] | string[]>) | null;
  /** Minimalna długość zapytania dla `source`. */
  minLength?: number;
  /** Opóźnienie zapytań `source` (ms) */
  delay?: number;
  placement?: Placement;
  offset?: number;
  emptyText?: string;
  loadingText?: string;
  createText?: string;
}

export interface CountdownOptions {
  /** Data docelowa (ISO 8601 lub znacznik czasu w ms) */
  date?: number | string;
  /** Alternatywnie: odliczanie względne w sekundach. */
  seconds?: number;
  autostart?: boolean;
  /** Minimalna liczba cyfr w komórce. */
  pad?: number;
  /** Po zakończeniu odliczanie względne zaczyna się od nowa. */
  reload?: boolean;
}

export interface CounterOptions {
  /** Wartość końcowa; domyślnie liczba z treści elementu. */
  to?: number | null;
  from?: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  /** Separator tysięcy; domyślnie wg locale (pl-PL: spacja niełamiąca) */
  separator?: string | null;
  /** Separator dziesiętny; domyślnie wg locale (pl-PL: przecinek) */
  decimal?: string | null;
  prefix?: string;
  suffix?: string;
  locale?: string;
  /** Linear | ease-out | ease-in-out. */
  easing?: 'linear' | 'ease-out' | 'ease-in-out';
  /** Animuj tylko przy pierwszym wejściu w widok. */
  once?: boolean;
  /** Start po wejściu w widok. */
  autostart?: boolean;
}

export interface DatepickerOptions {
  inline?: boolean;
  /** Wybór zakresu dat. */
  range?: boolean;
  /** Wartość początkowa (ISO; zakres: "od/do") */
  value?: string;
  /** 'YYYY-MM-DD', 'today' lub przesunięcie w dniach: '+7', '-30'. */
  min?: string | null;
  max?: string | null;
  /** Dni tygodnia: 0 = niedziela … 6 = sobota, np. "0,6". */
  disabledDays?: string;
  /** Konkretne daty ISO rozdzielone przecinkami. */
  disabledDates?: string;
  locale?: string;
  format?: string;
  /** Łącznik dat zakresu. */
  separator?: string;
  /** 1 = poniedziałek. */
  weekStart?: number;
  /** Nazwa ukrytego pola z wartością ISO. */
  name?: string;
  /** Przyciski „Dziś" i „Wyczyść". */
  footer?: boolean;
  closeOnSelect?: boolean;
  placement?: Placement;
  offset?: number;
  /** Nadpisanie tekstów interfejsu. */
  labels?: Record<string, string> | null;
}

export interface DropOptions {
  /** Selektor przełącznika (domyślnie poprzedni element) */
  toggle?: string | null;
  /** Click | hover (domyślnie click; hover dla podmenu) */
  mode?: 'click' | 'hover' | null;
  /** Np. bottom-start (domyślnie; right-start dla podmenu) */
  pos?: Placement | null;
  /** Odstęp od przełącznika w px (domyślnie 8; 4 dla podmenu) */
  offset?: number | null;
  /** Opóźnienie otwarcia w trybie hover (ms) */
  delayShow?: number;
  /** Opóźnienie zamknięcia w trybie hover (ms) */
  delayHide?: number;
  /** Auto | true | false. */
  closeOnClick?: 'auto' | boolean;
  /** Szerokość co najmniej taka jak przełącznika. */
  matchWidth?: boolean;
  flip?: boolean;
  shift?: boolean;
}

export interface FilterOptions {
  /** Selektor kontenera z elementami. */
  target?: string;
  /** Selektor kontrolek aktywnych na starcie. */
  selActive?: string | false;
  /** Slide | fade | delayed-fade | false. */
  animation?: 'slide' | 'fade' | 'delayed-fade' | false;
  duration?: number;
}

export interface AutosizeOptions {
  /** Minimalna liczba wierszy (0 = z atrybutu rows / CSS) */
  minRows?: number;
  /** Po przekroczeniu pojawia się przewijanie (0 = bez limitu) */
  maxRows?: number;
}

export interface PasswordToggleOptions {
  /** Selektor pola; domyślnie pole hasła w tym samym opakowaniu. */
  target?: string;
  iconShow?: string;
  iconHide?: string;
  labelShow?: string;
  labelHide?: string;
}

export interface CharCountOptions {
  /** Limit; domyślnie z atrybutu maxlength (0 = sam licznik) */
  max?: number;
  /** Selektor elementu licznika; domyślnie .pl-form-count w polu lub nowy element. */
  target?: string;
  /** Od jakiej części limitu licznik ostrzega. */
  warn?: number;
  template?: string;
}

export interface FormClearOptions {
}

export interface FormValidateOptions {
  /** Sprawdza pole po opuszczeniu (blur) i poprawia na bieżąco. */
  live?: boolean;
  /** Oznacza poprawne pola klasą .pl-form-success. */
  success?: boolean;
  /** Potrząsa błędnymi polami przy próbie wysłania. */
  shake?: boolean;
  /** Przenosi fokus do pierwszego błędnego pola. */
  focus?: boolean;
}

export interface HeightMatchOptions {
  /** Wyrównywane elementy. */
  target?: string;
  /** Wyrównuj osobno w każdym wizualnym rzędzie. */
  row?: boolean;
}

export interface HeightViewportOptions {
  /** True → odejmij odległość elementu od góry strony; liczba → px. */
  offsetTop?: boolean | number;
  /** True → odejmij wysokość następnego elementu; 1–100 → % okna; >100 → px; '80px', '10vh' lub selektor. */
  offsetBottom?: boolean | number | string;
  /** Rozciągnij element tak, by strona wypełniła całe okno. */
  expand?: boolean;
  /** Dolna granica w px. */
  min?: number;
}

export interface IconOptions {
  name?: string;
  stroke?: number;
}

export interface LightboxOptions {
  /** Slide | fade. */
  animation?: string;
  /** Po ostatniej pozycji wraca do pierwszej. */
  loop?: boolean;
  /** Pasek miniatur. */
  thumbs?: boolean;
  /** Licznik „3 / 8". */
  counter?: boolean;
}

export interface ModalOptions {
  /** Kliknięcie tła zamyka. */
  backdropClose?: boolean;
  /** Klawisz Esc zamyka. */
  escClose?: boolean;
  /** Kliknięcie tła nie zamyka — okno „potrząsa głową". */
  static?: boolean;
  /** Pozwala otworzyć nakładkę nad inną. */
  stack?: boolean;
}

export interface NavbarOptions {
  /** Po ilu px przewinięcia pasek dostaje klasę `cls`. */
  offset?: number;
  cls?: string;
  /** Chowaj przy przewijaniu w dół. */
  hide?: boolean;
  /** Od ilu px przewinięcia wolno chować. */
  hideOffset?: number;
  /** Minimalny ruch (px), który zmienia stan. */
  tolerance?: number;
  /** Selektor przewijanego kontenera (domyślnie okno) */
  container?: string | null;
}

export interface NavOptions {
  /** Pozwala otworzyć wiele podmenu naraz. */
  multiple?: boolean;
  /** Pozwala zamknąć wszystkie. */
  collapsible?: boolean;
  duration?: number;
}

export interface NotificationOptions {
  message?: string;
  title?: string;
  status?: NotificationStatus;
  pos?: NotificationPosition;
  timeout?: number;
  icon?: string | boolean | null;
  close?: boolean;
  group?: string;
  cls?: string;
  progress?: boolean;
}

export interface OffcanvasOptions {
  /** Kliknięcie tła zamyka. */
  backdropClose?: boolean;
  /** Klawisz Esc zamyka. */
  escClose?: boolean;
  /** Kliknięcie tła nie zamyka — okno „potrząsa głową". */
  static?: boolean;
  /** Pozwala otworzyć nakładkę nad inną. */
  stack?: boolean;
  /** Left | right | top | bottom. */
  side?: 'left' | 'right' | 'top' | 'bottom';
  /** False = bez przyciemnienia tła. */
  overlay?: boolean;
  /** Zamykanie gestem przesunięcia (panele boczne, dotyk) */
  swipe?: boolean;
  /** Kliknięcie odnośnika do kotwicy (#sekcja) zamyka panel. */
  anchorClose?: boolean;
}

export interface OtpOptions {
  length?: number;
  /** Numeric | alphanumeric. */
  type?: string;
  /** Kreska co N znaków (0 = brak) */
  separator?: number;
  /** Ukrywa znaki jak w polu hasła. */
  masked?: boolean;
  /** Nazwa tworzonego pola ukrytego (gdy brak własnego <input>) */
  name?: string;
  autofocus?: boolean;
  /** Po wpisaniu całego kodu wysyła formularz. */
  submit?: boolean;
  label?: string;
}

export interface ParallaxOptions {
  x?: number | string | null;
  y?: number | string | null;
  scale?: number | string | null;
  rotate?: number | string | null;
  opacity?: number | string | null;
  blur?: number | string | null;
  grayscale?: number | string | null;
  saturate?: number | string | null;
  brightness?: number | string | null;
  hue?: number | string | null;
  bgx?: number | string | null;
  bgy?: number | string | null;
  /** Wykładnik krzywej: 1 liniowo, >1 wolny start, <1 szybki start. */
  easing?: number;
  /** Przesunięcie początku (px, vh, % wysokości celu) */
  start?: number | string;
  /** Przesunięcie końca. */
  end?: number | string;
  /** Aktywny od podanej szerokości. */
  media?: number | string | false;
  /** Element, którego przejście przez okno wyznacza postęp ('!.x' → najbliższy przodek) */
  target?: string | false | null;
}

export interface PopoverOptions {
  title?: string;
  content?: string;
  /** Selektor elementu, który staje się treścią popovera. */
  target?: string | null;
  pos?: Placement;
  /** Click | hover | focus. */
  mode?: string;
  offset?: number;
  /** Przycisk zamykania. */
  close?: boolean;
  /** Zamykanie kliknięciem poza popoverem. */
  dismiss?: boolean;
  /** Traktuj title / content jako HTML. */
  html?: boolean;
  /** Dodatkowe klasy, np. pl-popover-large. */
  cls?: string;
  delayShow?: number;
  delayHide?: number;
  /** Przenieś fokus do popovera, jeśli ma elementy interaktywne. */
  focus?: boolean;
}

export interface QuantityOptions {
  min?: number | null;
  max?: number | null;
  step?: number | null;
  /** Przytrzymanie przycisku powtarza zmianę. */
  repeat?: boolean;
  minusLabel?: string;
  plusLabel?: string;
}

export interface RangeOptions {
  /** Dwa kciuki (element to opakowanie z dwoma polami) */
  dual?: boolean;
  /** Dymek z wartością: true (przy hoverze / fokusie) albo 'always'. */
  tooltip?: boolean | 'always';
  /** Liczba znaczników podziałki generowanych pod suwakiem. */
  ticks?: number;
  /** Minimalny odstęp między kciukami (dual) */
  gap?: number;
  prefix?: string;
  suffix?: string;
  /** Selektor elementu, do którego trafia sformatowana wartość. */
  output?: string;
}

export interface RatingOptions {
  value?: number;
  max?: number;
  /** Nazwa pól radio (wartość trafia do formularza) */
  name?: string;
  readonly?: boolean;
  /** Ponowne kliknięcie wybranej gwiazdki zeruje ocenę. */
  clearable?: boolean;
  label?: string;
  /** Odmiana do etykiet ARIA. */
  star?: string;
}

export interface ScrollOptions {
  /** Odstęp od górnej krawędzi (np. wysokość przyklejonego nagłówka) */
  offset?: number;
  /** Ms albo 'auto' (zależnie od dystansu) */
  duration?: number | 'auto';
  /** Linear | ease-in | ease-out | ease-in-out | spring. */
  easing?: string;
  /** Aktualizuj adres. */
  hash?: boolean;
  /** Przenieś fokus na cel. */
  focus?: boolean;
}

export interface ScrollspyOptions {
  /** Klasa (klasy) dodawana po wejściu w widok. */
  cls?: string;
  /** Elementy obserwowane; domyślnie sam element. */
  target?: string | null;
  /** Ukryj (.pl-invisible) do czasu wejścia w widok. */
  hidden?: boolean;
  /** Powiększa (+) lub pomniejsza (−) obszar widoku w pionie, px. */
  offsetTop?: number;
  /** Jw. w poziomie. */
  offsetLeft?: number;
  /** Powtarzaj przy każdym wejściu. */
  repeat?: boolean;
  /** Opóźnienie między kolejnymi elementami, ms. */
  delay?: number;
}

export interface ScrollspyNavOptions {
  /** Klasa aktywnej pozycji. */
  cls?: string;
  /** Przodek linku, który dostaje klasę (false → sam link) */
  closest?: string | boolean;
  /** Płynne przewijanie po kliknięciu. */
  scroll?: boolean;
  /** Odstęp od górnej krawędzi, px. */
  offset?: number;
  /** Pierwsza pozycja aktywna także przed pierwszą sekcją. */
  overflow?: boolean;
  duration?: number | 'auto';
}

export interface SliderOptions {
  /** Wyśrodkowuje aktywny element. */
  center?: boolean;
  /** Bez zapętlenia. */
  finite?: boolean;
  /** Przewija o cały zestaw widocznych elementów. */
  sets?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  pauseOnHover?: boolean;
  draggable?: boolean;
  index?: number;
  /** Mnożnik szybkości animacji. */
  velocity?: number;
}

export interface SlideshowOptions {
  /** Slide | fade | scale | push | pull | zoom. */
  animation?: string;
  autoplay?: boolean;
  autoplayInterval?: number;
  pauseOnHover?: boolean;
  /** False = wysokość tylko z min-height. */
  ratio?: string | false;
  minHeight?: string;
  maxHeight?: string;
  finite?: boolean;
  draggable?: boolean;
  kenburns?: boolean;
  /** Pasek postępu autoodtwarzania. */
  progress?: boolean;
  index?: number;
  velocity?: number;
}

export interface SortableOptions {
  /** Sortable o tej samej grupie wymieniają się elementami. */
  group?: string;
  /** Selektor uchwytu; puste = cały element. */
  handle?: string;
  animation?: number;
  clsDrag?: string;
  clsPlaceholder?: string;
  clsEmpty?: string;
  threshold?: number;
}

export interface SpotlightOptions {
  /** Selektor elementów podświetlanych (domyślnie sam element) */
  target?: string | null;
}

export interface StickyOptions {
  /** Odstęp od górnej krawędzi okna po przyklejeniu (px, vh) */
  offset?: number | string;
  /** Dodatkowy dystans przewijania, po którym element się przykleja (px, vh, % lub selektor) */
  top?: number | string;
  /** Alias `end` (true → rodzic) */
  bottom?: boolean | string;
  /** Granica: 'parent' / true, '!.selektor' (najbliższy przodek) albo selektor. */
  end?: boolean | string;
  clsActive?: string;
  clsInactive?: string;
  /** Klasa animacji przy przyklejeniu (i odwrócona przy odklejeniu) */
  animation?: string | false;
  /** Chowaj przy przewijaniu w dół, pokazuj przy przewijaniu w górę. */
  showOnUp?: boolean;
  /** Aktywny od podanej szerokości (px, '@m', zapytanie media) */
  media?: number | string | false;
  zIndex?: number | null;
}

export interface StrengthOptions {
  minLength?: number;
  /** Lista wymagań odhaczanych na żywo. */
  rules?: boolean;
  /** Etykieta słowna. */
  label?: boolean;
  labels?: string | string[];
  /** Selektor pola, gdy leży poza komponentem. */
  input?: string;
  emptyLabel?: string;
}

export interface SwitcherOptions {
  /** Selektor kontenera paneli; domyślnie następne rodzeństwo .pl-switcher. */
  connect?: string | null;
  /** Selektor pozycji, np. '> *'; domyślnie '> li' lub bezpośrednie dzieci. */
  toggle?: string | null;
  /** Indeks pozycji aktywnej na starcie. */
  active?: number | null;
  /** True → delikatne wejście; false → brak; klasa lub „klasa-naprzód, klasa-wstecz". */
  animation?: boolean | string;
  /** Przesunięcie palcem zmienia panel. */
  swiping?: boolean;
  /** Synchronizacja z adresem (#id panelu lub href pozycji) */
  followHash?: boolean;
}

export interface ToggleOptions {
  /** Selektor, 'next', 'prev', 'parent', '> .x'; domyślnie href lub następny element. */
  target?: string | null;
  /** Klasa przełączana na celu; bez niej przełączany jest atrybut hidden. */
  cls?: string;
  /** True → płynna wysokość; nazwa klasy animacji (opcjonalnie „wejście, wyjście") */
  animation?: boolean | string;
  /** Click | hover (można łączyć: "click, hover") */
  mode?: string;
  /** Wiele celów pokazywanych po kolei. */
  queued?: boolean;
  /** Aktywny dopiero od podanej szerokości (px, '@m' lub zapytanie media) */
  media?: number | string | false;
  duration?: number;
}

export interface TooltipOptions {
  title?: string;
  pos?: Placement;
  offset?: number;
  /** Opóźnienie pokazania (ms) */
  delay?: number;
  /** Dodatkowe klasy dymka, np. pl-tooltip-light. */
  cls?: string;
  /** Traktuj tytuł jako HTML. */
  html?: boolean;
}

export interface TotopOptions {
  /** Po ilu pikselach przewinięcia przycisk staje się aktywny. */
  offset?: number;
  /** Selektor elementu, do którego wracamy (domyślnie: góra strony / cel z href) */
  target?: string;
  /** Po przewinięciu przenieś fokus na cel (dostępność) */
  focus?: boolean;
  cls?: string;
}

export interface UploadOptions {
  /** Domyślnie wg atrybutu `multiple` pola. */
  multiple?: boolean | null;
  /** Np. "image/*, .pdf" (domyślnie wg atrybutu `accept` pola) */
  accept?: string;
  /** MB, 0 = bez limitu. */
  maxSize?: number;
  /** 0 = bez limitu. */
  maxFiles?: number;
  /** Adres, pod który wysyłane są pliki (XHR) */
  url?: string;
  /** Nazwa pola w FormData. */
  name?: string;
  method?: string;
  /** Wysyłaj od razu po wybraniu. */
  auto?: boolean;
  /** Miniatury obrazów. */
  thumbnails?: boolean;
  /** Selektor własnej listy plików. */
  list?: string;
  /** Pokazuj komunikaty błędów pod strefą. */
  messages?: boolean;
}

export interface VideoOptions {
  /** True | false | inview | hover. */
  autoplay?: boolean | string;
  /** Wycisz przed automatycznym odtwarzaniem (wymóg przeglądarek) */
  automute?: boolean;
  /** Element reagujący na kursor ('!.x' → najbliższy przodek); domyślnie samo wideo. */
  hoverTarget?: boolean;
  /** Po zatrzymaniu wróć do początku. */
  rewind?: boolean;
  /** Część wideo, która musi być widoczna (tryb inview) */
  threshold?: number;
}

// ── Komponenty ────────────────────────────────────────────────────────────

/** Pozycja akordeonu lub rozwijanej nawigacji: indeks albo element. */
export type ItemRef = number | Element;

export class Accordion extends Component<AccordionOptions> {
  readonly items: HTMLElement[];
  toggle(item: ItemRef): void;
  show(item: ItemRef): Promise<void>;
  hide(item: ItemRef): Promise<void>;
}

export class Alert extends Component<AlertOptions> {
  /** Zamyka alert z animacją. */
  close(): Promise<void>;
  hide(): void;
}

export class Combobox extends Component<ComboboxOptions> {
  /** Wybrana wartość; przy wyborze wielokrotnym — tablica wartości. */
  readonly value: string | string[];
  open(): void;
  close(): Promise<void>;
  toggle(): void;
  setValue(value: string | string[] | null, silent?: boolean): void;
  clear(): void;
  setOptions(list: Array<string | ComboboxItem>, silent?: boolean): void;
  refresh(): void;
}

export class Countdown extends Component<CountdownOptions> {
  readonly running: boolean;
  start(): void;
  stop(): void;
  reset(options?: Partial<CountdownOptions>): void;
}

export class Counter extends Component<CounterOptions> {
  start(to?: number): void;
  stop(): void;
  reset(): void;
}

export class Datepicker extends Component<DatepickerOptions> {
  /** Wartość w formacie ISO (`YYYY-MM-DD`); dla zakresu `od/do`. */
  readonly value: string;
  open(): void;
  close(): Promise<void>;
  toggle(): void;
  setDate(value: string | Date | Array<string | Date> | null, silent?: boolean): void;
  getDate(): Date | [Date | null, Date | null] | null;
  clear(): void;
  update(options?: Partial<DatepickerOptions>): void;
}

export class Drop extends Component<DropOptions> {
  show(): void;
  hide(): Promise<void>;
  toggle(): void;
}

export interface FilterState {
  filter?: Record<string, string>;
  sort?: [attribute: string, order: 'asc' | 'desc'] | [];
}

export class Filter extends Component<FilterOptions> {
  apply(control: Element): void;
  setState(state: FilterState, animate?: boolean): void;
  getState(): FilterState;
  reset(): void;
}

export class Autosize extends Component<AutosizeOptions> {
  update(): void;
}

export class PasswordToggle extends Component<PasswordToggleOptions> {
  show(): void;
  hide(): void;
  toggle(): void;
}

export class CharCount extends Component<CharCountOptions> {
  update(): void;
}

export class FormClear extends Component<FormClearOptions> {
  clear(): void;
}

export class FormValidate extends Component<FormValidateOptions> {
  /** Sprawdza cały formularz; `true`, gdy wszystkie pola są poprawne. */
  validate(): boolean;
  validateField(field: Element): boolean;
  reset(): void;
}

export class HeightMatch extends Component<HeightMatchOptions> {}
export class HeightViewport extends Component<HeightViewportOptions> {}

export class Icon extends Component<IconOptions> {
  render(name?: string): void;
}

export interface LightboxItem {
  source: string;
  type?: string;
  caption?: string;
  thumb?: string;
  alt?: string;
  poster?: string;
}

export interface LightboxPanelOptions extends LightboxOptions {
  items: LightboxItem[];
  index?: number;
}

export interface LightboxPanel {
  show(index?: number): Promise<void>;
  hide(): void;
  next(): void;
  prev(): void;
  destroy(): void;
}

export class Lightbox extends Component<LightboxOptions> {
  show(index?: number): void;
  hide(): void;
  next(): void;
  prev(): void;
}

export class Modal extends Component<ModalOptions> {
  show(opener?: Element): Promise<void>;
  hide(): void;
  toggle(opener?: Element): void;
}

export class Offcanvas extends Component<OffcanvasOptions> {
  show(opener?: Element): Promise<void>;
  hide(): void;
  toggle(opener?: Element): void;
}

export class Navbar extends Component<NavbarOptions> {
  show(): void;
  hide(): void;
  update(): void;
}

export class Nav extends Component<NavOptions> {
  toggle(item: ItemRef): void;
  show(item: ItemRef): Promise<void>;
  hide(item: ItemRef): Promise<void>;
}

/** Opcje `Plossy.notification({...})` — szersze niż atrybutu `data-pl-notification`. */
export interface NotificationConfig extends NotificationOptions {
  /** Przycisk akcji w powiadomieniu. */
  action?: { label: string; onClick?: (notification: NotificationHandle) => void } | null;
  /** Traktuje `message` jako HTML. */
  html?: boolean;
  onClose?: ((notification: NotificationHandle) => void) | null;
}

export interface NotificationHandle {
  readonly el: HTMLElement;
  readonly options: NotificationConfig;
  close(): void;
  update(message: string): void;
}

export class Notification extends Component<NotificationOptions> {
  /** Pokazuje powiadomienie; `null`, gdy anulowano `pl:beforeshow`. */
  show(): NotificationHandle | null;
}

export class Otp extends Component<OtpOptions> {
  value: string;
  readonly complete: boolean;
  setValue(code: string): void;
  clear(focus?: boolean): void;
  focus(): void;
  error(options?: { clear?: boolean }): void;
  success(): void;
  reset(): void;
  disable(state?: boolean): void;
}

export class Parallax extends Component<ParallaxOptions> {}

export class Popover extends Component<PopoverOptions> {
  show(): void;
  hide(): Promise<void>;
  toggle(): void;
  update(options?: Partial<PopoverOptions>): void;
}

export class Quantity extends Component<QuantityOptions> {
  value: number;
  set(value: number | string): void;
  /** Zmienia wartość o krok: `1` w górę, `-1` w dół. */
  step(direction?: number): void;
  disable(state?: boolean): void;
}

export class Range extends Component<RangeOptions> {
  /** Wartość; dla dwóch uchwytów — para `[od, do]`. */
  readonly value: number | [number, number];
  set(value: number | [number, number]): void;
  update(): void;
}

export class Rating extends Component<RatingOptions> {
  value: number;
  set(value: number): void;
  clear(): void;
  disable(state?: boolean): void;
}

export class Scroll extends Component<ScrollOptions> {}
export class Scrollspy extends Component<ScrollspyOptions> {}
export class ScrollspyNav extends Component<ScrollspyNavOptions> {}

/** Cel pokazu slajdu: indeks albo kierunek. */
export type SlideTarget = number | 'next' | 'previous';

export class Slider extends Component<SliderOptions> {
  show(target: SlideTarget): void;
  startAutoplay(): void;
  stopAutoplay(): void;
  update(): void;
}

export class Slideshow extends Component<SlideshowOptions> {
  show(target: SlideTarget): void;
  startAutoplay(): void;
  stopAutoplay(): void;
  update(): void;
}

export class Sortable extends Component<SortableOptions> {
  /** Kolejność elementów jako lista wartości atrybutu (domyślnie `id`). */
  toArray(attribute?: string): string[];
  refresh(): void;
}

export class Spotlight extends Component<SpotlightOptions> {}
export class Sticky extends Component<StickyOptions> {}

export interface StrengthResult {
  score: number;
  label: string;
  rules: Record<string, boolean>;
}

export class Strength extends Component<StrengthOptions> {
  readonly score: number;
  readonly rules: Record<string, boolean>;
  check(value?: string): StrengthResult;
  update(): void;
}

export class Switcher extends Component<SwitcherOptions> {
  readonly index: number;
  show(index: number): void;
}

export class Toggle extends Component<ToggleOptions> {
  toggle(): Promise<void>;
  isToggled(): boolean;
}

export class Tooltip extends Component<TooltipOptions> {
  show(): void;
  hide(): Promise<void>;
  setTitle(title: string): void;
}

export class Totop extends Component<TotopOptions> {
  scroll(): void;
  refresh(): void;
}

export class Upload extends Component<UploadOptions> {
  readonly files: File[];
  add(files: FileList | File[]): void;
  remove(file: File): void;
  clear(): void;
  /** Otwiera systemowe okno wyboru plików. */
  browse(): void;
  upload(): void;
  setProgress(file: File, percent: number): void;
  complete(file: File, response?: any): void;
  fail(file: File, message?: string): void;
}

export class Video extends Component<VideoOptions> {
  play(): void;
  pause(): void;
}

// ── Obiekt Plossy ─────────────────────────────────────────────────────────

/** `Plossy.nazwa(element, opcje)` — tworzy komponent albo zwraca istniejącą instancję; `null`, gdy brak elementu. */
export type Factory<C, O> = (target: Target, options?: Partial<O>) => C | null;

export interface DialogOptions extends ModalOptions {
  /** Dodatkowe klasy elementu `<dialog>`. */
  cls?: string;
  [key: string]: any;
}

export interface ModalFactory extends Factory<Modal, ModalOptions> {
  /** Otwiera modal z podaną treścią (HTML lub węzeł) i usuwa go po zamknięciu. */
  dialog(content: string | Node, options?: DialogOptions): Modal;
  alert(message: string, options?: DialogOptions): Promise<void>;
  confirm(message: string, options?: DialogOptions): Promise<boolean>;
  prompt(message: string, value?: string, options?: DialogOptions): Promise<string | null>;
  /** Domyślne etykiety przycisków — można nadpisać globalnie. */
  labels: Record<string, string>;
}

export interface ScrollToOptions {
  offset?: number;
  duration?: number | 'auto';
  easing?: string;
  container?: Target;
  [key: string]: any;
}

export interface ScrollFactory extends Factory<Scroll, ScrollOptions> {
  /** Płynnie przewija do elementu lub pozycji. `true` po dotarciu, `false`, gdy ruch przerwano. */
  to(target: Target | number, options?: ScrollToOptions): Promise<boolean>;
}

export interface NotificationFunction {
  (message: string, options?: NotificationConfig): NotificationHandle;
  (options: NotificationConfig): NotificationHandle;
  /** Zamyka wszystkie powiadomienia (albo tylko z podanej grupy). */
  closeAll(group?: string): void;
  defaults: NotificationConfig;
}

export interface PlaceOptions {
  placement?: Placement;
  offset?: number;
  flip?: boolean;
  shift?: boolean;
  padding?: number;
  matchWidth?: boolean;
}

export interface PlossyUtil {
  $(selector: Target | null | undefined, context?: ParentNode): HTMLElement | null;
  $$(selector: string | Element | Iterable<Element> | null | undefined, context?: ParentNode): HTMLElement[];
  uid(prefix?: string): string;
  clamp(value: number, min: number, max: number): number;
  parseOptions(value: string | null, defaults?: Record<string, any>, primary?: string | null): Record<string, any>;
  queryTargets(el: Element, target: Target | null | undefined): Element[];
  focusables(el: Element): HTMLElement[];
  animationsDone(el: Element): Promise<unknown>;
  animateClass(el: Element, className: string): Promise<void>;
  toggleHeight(el: HTMLElement, show: boolean, options?: { duration?: number; easing?: string }): Promise<unknown>;
  showLayer(el: HTMLElement): void;
  hideLayer(el: HTMLElement): void;
  place(floating: HTMLElement, reference: Element | DOMRect, options?: PlaceOptions): unknown;
  /** Utrzymuje położenie przy przewijaniu i zmianie rozmiaru. Zwraca funkcję zatrzymującą. */
  autoPlace(floating: HTMLElement, reference: Element, options?: PlaceOptions): () => void;
  lockScroll(): void;
  unlockScroll(): void;
  rafThrottle<F extends (...args: any[]) => void>(fn: F): F;
  debounce<F extends (...args: any[]) => void>(fn: F, wait?: number): F;
  prefersReducedMotion(): boolean;
}

export interface PlossyApi {
  accordion: Factory<Accordion, AccordionOptions>;
  alert: Factory<Alert, AlertOptions>;
  autosize: Factory<Autosize, AutosizeOptions>;
  charCount: Factory<CharCount, CharCountOptions>;
  combobox: Factory<Combobox, ComboboxOptions>;
  countdown: Factory<Countdown, CountdownOptions>;
  counter: Factory<Counter, CounterOptions>;
  datepicker: Factory<Datepicker, DatepickerOptions>;
  drop: Factory<Drop, DropOptions>;
  filter: Factory<Filter, FilterOptions>;
  formClear: Factory<FormClear, FormClearOptions>;
  formValidate: Factory<FormValidate, FormValidateOptions>;
  heightMatch: Factory<HeightMatch, HeightMatchOptions>;
  heightViewport: Factory<HeightViewport, HeightViewportOptions>;
  icon: Factory<Icon, IconOptions>;
  lightbox: Factory<Lightbox, LightboxOptions>;
  modal: ModalFactory;
  nav: Factory<Nav, NavOptions>;
  navbar: Factory<Navbar, NavbarOptions>;
  offcanvas: Factory<Offcanvas, OffcanvasOptions>;
  otp: Factory<Otp, OtpOptions>;
  parallax: Factory<Parallax, ParallaxOptions>;
  passwordToggle: Factory<PasswordToggle, PasswordToggleOptions>;
  popover: Factory<Popover, PopoverOptions>;
  quantity: Factory<Quantity, QuantityOptions>;
  range: Factory<Range, RangeOptions>;
  rating: Factory<Rating, RatingOptions>;
  scroll: ScrollFactory;
  scrollspy: Factory<Scrollspy, ScrollspyOptions>;
  scrollspyNav: Factory<ScrollspyNav, ScrollspyNavOptions>;
  slider: Factory<Slider, SliderOptions>;
  slideshow: Factory<Slideshow, SlideshowOptions>;
  sortable: Factory<Sortable, SortableOptions>;
  spotlight: Factory<Spotlight, SpotlightOptions>;
  sticky: Factory<Sticky, StickyOptions>;
  strength: Factory<Strength, StrengthOptions>;
  switcher: Factory<Switcher, SwitcherOptions>;
  toggle: Factory<Toggle, ToggleOptions>;
  tooltip: Factory<Tooltip, TooltipOptions>;
  totop: Factory<Totop, TotopOptions>;
  upload: Factory<Upload, UploadOptions>;
  video: Factory<Video, VideoOptions>;

  /** Powiadomienie z kodu: `Plossy.notification('Zapisano')`. */
  notification: NotificationFunction;
  /** Galeria bez znaczników w HTML. */
  lightboxPanel(options: LightboxPanelOptions): LightboxPanel;
  /** Rejestr ikon dla `data-pl-icon`. */
  icons: {
    add(icons: Record<string, string>): void;
    names(): string[];
    get(name: string): string | null;
  };

  /** Rejestruje własny komponent pod `data-pl-{name}` i `Plossy.{name}()`. */
  register<T extends typeof Component<any>>(name: string, Class: T): T;
  /** Inicjalizuje komponenty w podanym fragmencie (zwykle dzieje się to samo). */
  scan(root?: ParentNode): void;
  getInstance<C = Component<any>>(el: Element, name: string): C | null;
  Component: typeof Component;
  util: PlossyUtil;

  /** Komponenty zarejestrowane przez `register()`. */
  [name: string]: any;
}

declare const Plossy: PlossyApi;
export default Plossy;

/** Ten sam obiekt co eksport domyślny. */
export const api: PlossyApi;

export const register: PlossyApi['register'];
export const scan: PlossyApi['scan'];
export const getInstance: PlossyApi['getInstance'];
/** Uruchamia automatyczną inicjalizację (przy imporcie w przeglądarce dzieje się to samo). */
export function start(): void;

export const $: PlossyUtil['$'];
export const $$: PlossyUtil['$$'];
export const uid: PlossyUtil['uid'];
export const clamp: PlossyUtil['clamp'];
export function camel(value: string): string;
export const parseOptions: PlossyUtil['parseOptions'];
export const queryTargets: PlossyUtil['queryTargets'];
export const focusables: PlossyUtil['focusables'];
export const animationsDone: PlossyUtil['animationsDone'];
export const animateClass: PlossyUtil['animateClass'];
export const toggleHeight: PlossyUtil['toggleHeight'];
export const showLayer: PlossyUtil['showLayer'];
export const hideLayer: PlossyUtil['hideLayer'];
export const place: PlossyUtil['place'];
export const autoPlace: PlossyUtil['autoPlace'];
export const lockScroll: PlossyUtil['lockScroll'];
export const unlockScroll: PlossyUtil['unlockScroll'];
export const rafThrottle: PlossyUtil['rafThrottle'];
export const debounce: PlossyUtil['debounce'];
export const prefersReducedMotion: PlossyUtil['prefersReducedMotion'];

// ── Zdarzenia i obiekt globalny ───────────────────────────────────────────

/** Nazwy zdarzeń wysyłanych przez komponenty. Zawartość `detail` opisują tabele „Zdarzenia" w dokumentacji. */
export type PlossyEventName =
  | 'active'
  | 'added'
  | 'afterfilter'
  | 'beforefilter'
  | 'beforehide'
  | 'beforeitemshow'
  | 'beforeopen'
  | 'beforescroll'
  | 'beforesend'
  | 'beforeshow'
  | 'change'
  | 'clear'
  | 'close'
  | 'complete'
  | 'completeall'
  | 'create'
  | 'end'
  | 'error'
  | 'exceed'
  | 'hidden'
  | 'hide'
  | 'inactive'
  | 'input'
  | 'invalid'
  | 'inview'
  | 'itemhide'
  | 'itemshow'
  | 'itemshown'
  | 'match'
  | 'moved'
  | 'notificationclose'
  | 'open'
  | 'outview'
  | 'pause'
  | 'play'
  | 'progress'
  | 'remove'
  | 'removed'
  | 'resize'
  | 'scroll'
  | 'scrolled'
  | 'select'
  | 'show'
  | 'shown'
  | 'start'
  | 'stop'
  | 'tick'
  | 'valid'
  | 'within';

type PlossyEventMap = { [K in PlossyEventName as `pl:${K}`]: PlossyEvent };

declare global {
  interface GlobalEventHandlersEventMap extends PlossyEventMap {}

  interface Window {
    Plossy: PlossyApi;
  }

  /** Obiekt globalny dostępny po dołączeniu `plossy.min.js` tagiem `<script>`. */
  // eslint-disable-next-line no-var
  var Plossy: PlossyApi;
}
