---
title: Filter
description: Filtrowanie i sortowanie elementów siatki z animacją — pasujące suną na nowe miejsca, pozostałe znikają w miejscu.
badge: JS
---

## Podstawowe użycie

Dodaj `data-pl-filter="target: .selektor"` do wspólnego kontenera kontrolek i listy. Kontrolka z `data-pl-filter-control="[selektor CSS]"` zostawia tylko pasujące dzieci celu; pusta wartość pokazuje wszystko. Aktywna kontrolka dostaje klasę `.pl-active`.

```html example
<div data-pl-filter="target: .js-filter-basic">
  <ul class="pl-subnav pl-subnav-pill pl-margin-bottom">
    <li class="pl-active" data-pl-filter-control><a href="#">Wszystko</a></li>
    <li data-pl-filter-control="[data-type='gory']"><a href="#">Góry</a></li>
    <li data-pl-filter-control="[data-type='woda']"><a href="#">Woda</a></li>
    <li data-pl-filter-control="[data-type='las']"><a href="#">Las</a></li>
  </ul>
  <div class="pl-grid pl-grid-small pl-child-width-1-2 pl-child-width-1-3@m js-filter-basic">
    <div data-type="gory" data-level="latwa" data-name="Hala Gąsienicowa" data-km="12">
      <div class="pl-card">
        <div class="pl-card-media"><img src="/img/photo-1.svg" alt="" width="1200" height="800"></div>
        <div class="pl-card-body">
          <p class="pl-card-meta">12 km · łatwa</p>
          <h3 class="pl-card-title">Hala Gąsienicowa</h3>
        </div>
      </div>
    </div>
    <div data-type="woda" data-level="latwa" data-name="Jezioro Solińskie" data-km="8">
      <div class="pl-card">
        <div class="pl-card-media"><img src="/img/photo-2.svg" alt="" width="1200" height="800"></div>
        <div class="pl-card-body">
          <p class="pl-card-meta">8 km · łatwa</p>
          <h3 class="pl-card-title">Jezioro Solińskie</h3>
        </div>
      </div>
    </div>
    <div data-type="woda" data-level="srednia" data-name="Mierzeja Helska" data-km="35">
      <div class="pl-card">
        <div class="pl-card-media"><img src="/img/photo-3.svg" alt="" width="1200" height="800"></div>
        <div class="pl-card-body">
          <p class="pl-card-meta">35 km · średnia</p>
          <h3 class="pl-card-title">Mierzeja Helska</h3>
        </div>
      </div>
    </div>
    <div data-type="gory" data-level="srednia" data-name="Szczeliniec Wielki" data-km="6">
      <div class="pl-card">
        <div class="pl-card-media"><img src="/img/photo-4.svg" alt="" width="1200" height="800"></div>
        <div class="pl-card-body">
          <p class="pl-card-meta">6 km · średnia</p>
          <h3 class="pl-card-title">Szczeliniec Wielki</h3>
        </div>
      </div>
    </div>
    <div data-type="las" data-level="latwa" data-name="Biebrzańskie bagna" data-km="14">
      <div class="pl-card">
        <div class="pl-card-media"><img src="/img/photo-5.svg" alt="" width="1200" height="800"></div>
        <div class="pl-card-body">
          <p class="pl-card-meta">14 km · łatwa</p>
          <h3 class="pl-card-title">Biebrzańskie bagna</h3>
        </div>
      </div>
    </div>
    <div data-type="gory" data-level="latwa" data-name="Dolina Chochołowska" data-km="16">
      <div class="pl-card">
        <div class="pl-card-media"><img src="/img/photo-6.svg" alt="" width="1200" height="800"></div>
        <div class="pl-card-body">
          <p class="pl-card-meta">16 km · łatwa</p>
          <h3 class="pl-card-title">Dolina Chochołowska</h3>
        </div>
      </div>
    </div>
    <div data-type="woda" data-level="trudna" data-name="Wigry" data-km="42">
      <div class="pl-card">
        <div class="pl-card-media"><img src="/img/photo-7.svg" alt="" width="1200" height="800"></div>
        <div class="pl-card-body">
          <p class="pl-card-meta">42 km · trudna</p>
          <h3 class="pl-card-title">Wigry</h3>
        </div>
      </div>
    </div>
    <div data-type="las" data-level="trudna" data-name="Ojców" data-km="21">
      <div class="pl-card">
        <div class="pl-card-media"><img src="/img/photo-8.svg" alt="" width="1200" height="800"></div>
        <div class="pl-card-body">
          <p class="pl-card-meta">21 km · trudna</p>
          <h3 class="pl-card-title">Ojców</h3>
        </div>
      </div>
    </div>
  </div>
</div>
```

Atrybut może stać na dowolnym elemencie — pozycji listy, linku albo przycisku. Elementy niepasujące dostają atrybut `hidden`, więc wypadają z układu siatki.

## Grupy filtrów

Składnia `filter: …; group: …` pozwala łączyć niezależne kryteria — elementy muszą spełnić wybrany filtr z każdej grupy. Kontrolka bez grupy (tu „Wyczyść") resetuje wszystkie. Element `.pl-filter-empty` pojawia się, gdy nic nie pasuje.

```html example
<div data-pl-filter="target: .js-filter-groups">
  <div class="pl-filter-bar">
    <span class="pl-filter-label">Typ</span>
    <ul class="pl-subnav pl-subnav-pill">
      <li class="pl-active" data-pl-filter-control="group: type"><a href="#">Każdy</a></li>
      <li data-pl-filter-control="filter: [data-type='gory']; group: type"><a href="#">Góry</a></li>
      <li data-pl-filter-control="filter: [data-type='woda']; group: type"><a href="#">Woda</a></li>
      <li data-pl-filter-control="filter: [data-type='las']; group: type"><a href="#">Las</a></li>
    </ul>
    <span class="pl-filter-label">Trudność</span>
    <ul class="pl-subnav pl-subnav-pill">
      <li class="pl-active" data-pl-filter-control="group: level"><a href="#">Każda</a></li>
      <li data-pl-filter-control="filter: [data-level='latwa']; group: level"><a href="#">Łatwa</a></li>
      <li data-pl-filter-control="filter: [data-level='srednia']; group: level"><a href="#">Średnia</a></li>
      <li data-pl-filter-control="filter: [data-level='trudna']; group: level"><a href="#">Trudna</a></li>
    </ul>
    <button class="pl-button pl-button-small" type="button" data-pl-filter-control>Wyczyść</button>
  </div>
  <div class="pl-grid pl-grid-small pl-child-width-1-2 pl-child-width-1-3@m js-filter-groups">
    <div data-type="gory" data-level="latwa" data-name="Hala Gąsienicowa" data-km="12">
      <div class="pl-card">
        <div class="pl-card-media"><img src="/img/photo-1.svg" alt="" width="1200" height="800"></div>
        <div class="pl-card-body">
          <p class="pl-card-meta">12 km · łatwa</p>
          <h3 class="pl-card-title">Hala Gąsienicowa</h3>
        </div>
      </div>
    </div>
    <div data-type="woda" data-level="latwa" data-name="Jezioro Solińskie" data-km="8">
      <div class="pl-card">
        <div class="pl-card-media"><img src="/img/photo-2.svg" alt="" width="1200" height="800"></div>
        <div class="pl-card-body">
          <p class="pl-card-meta">8 km · łatwa</p>
          <h3 class="pl-card-title">Jezioro Solińskie</h3>
        </div>
      </div>
    </div>
    <div data-type="woda" data-level="srednia" data-name="Mierzeja Helska" data-km="35">
      <div class="pl-card">
        <div class="pl-card-media"><img src="/img/photo-3.svg" alt="" width="1200" height="800"></div>
        <div class="pl-card-body">
          <p class="pl-card-meta">35 km · średnia</p>
          <h3 class="pl-card-title">Mierzeja Helska</h3>
        </div>
      </div>
    </div>
    <div data-type="gory" data-level="srednia" data-name="Szczeliniec Wielki" data-km="6">
      <div class="pl-card">
        <div class="pl-card-media"><img src="/img/photo-4.svg" alt="" width="1200" height="800"></div>
        <div class="pl-card-body">
          <p class="pl-card-meta">6 km · średnia</p>
          <h3 class="pl-card-title">Szczeliniec Wielki</h3>
        </div>
      </div>
    </div>
    <div data-type="las" data-level="latwa" data-name="Biebrzańskie bagna" data-km="14">
      <div class="pl-card">
        <div class="pl-card-media"><img src="/img/photo-5.svg" alt="" width="1200" height="800"></div>
        <div class="pl-card-body">
          <p class="pl-card-meta">14 km · łatwa</p>
          <h3 class="pl-card-title">Biebrzańskie bagna</h3>
        </div>
      </div>
    </div>
    <div data-type="gory" data-level="latwa" data-name="Dolina Chochołowska" data-km="16">
      <div class="pl-card">
        <div class="pl-card-media"><img src="/img/photo-6.svg" alt="" width="1200" height="800"></div>
        <div class="pl-card-body">
          <p class="pl-card-meta">16 km · łatwa</p>
          <h3 class="pl-card-title">Dolina Chochołowska</h3>
        </div>
      </div>
    </div>
    <div data-type="woda" data-level="trudna" data-name="Wigry" data-km="42">
      <div class="pl-card">
        <div class="pl-card-media"><img src="/img/photo-7.svg" alt="" width="1200" height="800"></div>
        <div class="pl-card-body">
          <p class="pl-card-meta">42 km · trudna</p>
          <h3 class="pl-card-title">Wigry</h3>
        </div>
      </div>
    </div>
    <div data-type="las" data-level="trudna" data-name="Ojców" data-km="21">
      <div class="pl-card">
        <div class="pl-card-media"><img src="/img/photo-8.svg" alt="" width="1200" height="800"></div>
        <div class="pl-card-body">
          <p class="pl-card-meta">21 km · trudna</p>
          <h3 class="pl-card-title">Ojców</h3>
        </div>
      </div>
    </div>
  </div>
  <p class="pl-filter-empty" hidden>Żadna trasa nie spełnia obu warunków. Spróbuj innego połączenia.</p>
</div>
```

## Sortowanie

`sort: atrybut; order: asc|desc` układa elementy według wartości atrybutu (liczby są porównywane liczbowo, tekst — według polskiego alfabetu). Sortowanie i filtry można łączyć, także w jednej kontrolce.

```html example
<div data-pl-filter="target: .js-filter-sort">
  <div class="pl-filter-bar">
    <ul class="pl-subnav pl-subnav-pill">
      <li class="pl-active" data-pl-filter-control><a href="#">Wszystko</a></li>
    <li data-pl-filter-control="[data-type='gory']"><a href="#">Góry</a></li>
    <li data-pl-filter-control="[data-type='woda']"><a href="#">Woda</a></li>
    <li data-pl-filter-control="[data-type='las']"><a href="#">Las</a></li>
    </ul>
    <span class="pl-filter-label">Sortuj</span>
    <ul class="pl-subnav pl-subnav-pill">
      <li data-pl-filter-control="sort: data-name"><a href="#">A–Z</a></li>
      <li data-pl-filter-control="sort: data-name; order: desc"><a href="#">Z–A</a></li>
      <li data-pl-filter-control="sort: data-km"><a href="#">Najkrótsze</a></li>
      <li data-pl-filter-control="sort: data-km; order: desc"><a href="#">Najdłuższe</a></li>
    </ul>
  </div>
  <div class="pl-grid pl-grid-small pl-child-width-1-2 pl-child-width-1-3@m js-filter-sort">
    <div data-type="gory" data-level="latwa" data-name="Hala Gąsienicowa" data-km="12">
      <div class="pl-card">
        <div class="pl-card-media"><img src="/img/photo-1.svg" alt="" width="1200" height="800"></div>
        <div class="pl-card-body">
          <p class="pl-card-meta">12 km · łatwa</p>
          <h3 class="pl-card-title">Hala Gąsienicowa</h3>
        </div>
      </div>
    </div>
    <div data-type="woda" data-level="latwa" data-name="Jezioro Solińskie" data-km="8">
      <div class="pl-card">
        <div class="pl-card-media"><img src="/img/photo-2.svg" alt="" width="1200" height="800"></div>
        <div class="pl-card-body">
          <p class="pl-card-meta">8 km · łatwa</p>
          <h3 class="pl-card-title">Jezioro Solińskie</h3>
        </div>
      </div>
    </div>
    <div data-type="woda" data-level="srednia" data-name="Mierzeja Helska" data-km="35">
      <div class="pl-card">
        <div class="pl-card-media"><img src="/img/photo-3.svg" alt="" width="1200" height="800"></div>
        <div class="pl-card-body">
          <p class="pl-card-meta">35 km · średnia</p>
          <h3 class="pl-card-title">Mierzeja Helska</h3>
        </div>
      </div>
    </div>
    <div data-type="gory" data-level="srednia" data-name="Szczeliniec Wielki" data-km="6">
      <div class="pl-card">
        <div class="pl-card-media"><img src="/img/photo-4.svg" alt="" width="1200" height="800"></div>
        <div class="pl-card-body">
          <p class="pl-card-meta">6 km · średnia</p>
          <h3 class="pl-card-title">Szczeliniec Wielki</h3>
        </div>
      </div>
    </div>
    <div data-type="las" data-level="latwa" data-name="Biebrzańskie bagna" data-km="14">
      <div class="pl-card">
        <div class="pl-card-media"><img src="/img/photo-5.svg" alt="" width="1200" height="800"></div>
        <div class="pl-card-body">
          <p class="pl-card-meta">14 km · łatwa</p>
          <h3 class="pl-card-title">Biebrzańskie bagna</h3>
        </div>
      </div>
    </div>
    <div data-type="gory" data-level="latwa" data-name="Dolina Chochołowska" data-km="16">
      <div class="pl-card">
        <div class="pl-card-media"><img src="/img/photo-6.svg" alt="" width="1200" height="800"></div>
        <div class="pl-card-body">
          <p class="pl-card-meta">16 km · łatwa</p>
          <h3 class="pl-card-title">Dolina Chochołowska</h3>
        </div>
      </div>
    </div>
    <div data-type="woda" data-level="trudna" data-name="Wigry" data-km="42">
      <div class="pl-card">
        <div class="pl-card-media"><img src="/img/photo-7.svg" alt="" width="1200" height="800"></div>
        <div class="pl-card-body">
          <p class="pl-card-meta">42 km · trudna</p>
          <h3 class="pl-card-title">Wigry</h3>
        </div>
      </div>
    </div>
    <div data-type="las" data-level="trudna" data-name="Ojców" data-km="21">
      <div class="pl-card">
        <div class="pl-card-media"><img src="/img/photo-8.svg" alt="" width="1200" height="800"></div>
        <div class="pl-card-body">
          <p class="pl-card-meta">21 km · trudna</p>
          <h3 class="pl-card-title">Ojców</h3>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Animacje

Opcja `animation` przyjmuje `slide` (domyślnie — elementy suną na nowe pozycje), `fade` (stary układ zanika, nowy się pojawia), `delayed-fade` (to samo kaskadowo) lub `false`. Czas ustawia `duration`.

```html example
<div class="pl-grid pl-child-width-1-2@m">
  <div data-pl-filter="target: .js-filter-fade; animation: fade; duration: 400">
    <p class="pl-filter-label pl-margin-small-bottom">fade</p>
    <ul class="pl-subnav pl-subnav-pill pl-margin-bottom">
      <li class="pl-active" data-pl-filter-control><a href="#">Wszystko</a></li>
    <li data-pl-filter-control="[data-type='gory']"><a href="#">Góry</a></li>
    <li data-pl-filter-control="[data-type='woda']"><a href="#">Woda</a></li>
    <li data-pl-filter-control="[data-type='las']"><a href="#">Las</a></li>
    </ul>
    <div class="pl-grid pl-grid-small pl-child-width-1-3 pl-child-width-1-4@m js-filter-fade">
    <div data-type="gory"><img src="/img/photo-1.svg" alt="Hala Gąsienicowa" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
    <div data-type="woda"><img src="/img/photo-2.svg" alt="Jezioro Solińskie" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
    <div data-type="woda"><img src="/img/photo-3.svg" alt="Mierzeja Helska" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
    <div data-type="gory"><img src="/img/photo-4.svg" alt="Szczeliniec Wielki" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
    <div data-type="las"><img src="/img/photo-5.svg" alt="Biebrzańskie bagna" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
    <div data-type="gory"><img src="/img/photo-6.svg" alt="Dolina Chochołowska" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
    <div data-type="woda"><img src="/img/photo-7.svg" alt="Wigry" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
    <div data-type="las"><img src="/img/photo-8.svg" alt="Ojców" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
  </div>
  </div>
  <div data-pl-filter="target: .js-filter-delayed; animation: delayed-fade; duration: 400">
    <p class="pl-filter-label pl-margin-small-bottom">delayed-fade</p>
    <ul class="pl-subnav pl-subnav-pill pl-margin-bottom">
      <li class="pl-active" data-pl-filter-control><a href="#">Wszystko</a></li>
    <li data-pl-filter-control="[data-type='gory']"><a href="#">Góry</a></li>
    <li data-pl-filter-control="[data-type='woda']"><a href="#">Woda</a></li>
    <li data-pl-filter-control="[data-type='las']"><a href="#">Las</a></li>
    </ul>
    <div class="pl-grid pl-grid-small pl-child-width-1-3 pl-child-width-1-4@m js-filter-delayed">
    <div data-type="gory"><img src="/img/photo-1.svg" alt="Hala Gąsienicowa" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
    <div data-type="woda"><img src="/img/photo-2.svg" alt="Jezioro Solińskie" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
    <div data-type="woda"><img src="/img/photo-3.svg" alt="Mierzeja Helska" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
    <div data-type="gory"><img src="/img/photo-4.svg" alt="Szczeliniec Wielki" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
    <div data-type="las"><img src="/img/photo-5.svg" alt="Biebrzańskie bagna" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
    <div data-type="gory"><img src="/img/photo-6.svg" alt="Dolina Chochołowska" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
    <div data-type="woda"><img src="/img/photo-7.svg" alt="Wigry" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
    <div data-type="las"><img src="/img/photo-8.svg" alt="Ojców" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
  </div>
  </div>
</div>
```

## Stan początkowy

Filtr startuje od kontrolek z klasą `.pl-active`. Opcja `sel-active` wskazuje je selektorem — wygodne, gdy znaczniki generuje szablon.

```html example
<div data-pl-filter="target: .js-filter-initial; sel-active: .js-start">
  <ul class="pl-subnav pl-subnav-pill pl-margin-bottom">
    <li data-pl-filter-control><a href="#">Wszystko</a></li>
    <li data-pl-filter-control="[data-type='gory']"><a href="#">Góry</a></li>
    <li class="js-start" data-pl-filter-control="[data-type='woda']"><a href="#">Woda</a></li>
    <li data-pl-filter-control="[data-type='las']"><a href="#">Las</a></li>
  </ul>
  <div class="pl-grid pl-grid-small pl-child-width-1-3 pl-child-width-1-4@m js-filter-initial">
    <div data-type="gory"><img src="/img/photo-1.svg" alt="Hala Gąsienicowa" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
    <div data-type="woda"><img src="/img/photo-2.svg" alt="Jezioro Solińskie" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
    <div data-type="woda"><img src="/img/photo-3.svg" alt="Mierzeja Helska" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
    <div data-type="gory"><img src="/img/photo-4.svg" alt="Szczeliniec Wielki" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
    <div data-type="las"><img src="/img/photo-5.svg" alt="Biebrzańskie bagna" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
    <div data-type="gory"><img src="/img/photo-6.svg" alt="Dolina Chochołowska" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
    <div data-type="woda"><img src="/img/photo-7.svg" alt="Wigry" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
    <div data-type="las"><img src="/img/photo-8.svg" alt="Ojców" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
  </div>
</div>
```

## Sterowanie z JavaScriptu

`setState()` ustawia filtry bez klikania, a zdarzenie `pl:afterfilter` zwraca widoczne elementy — np. do licznika wyników.

```html example
<div id="demo-filter-api" data-pl-filter="target: .js-filter-api">
  <div class="pl-filter-bar">
    <ul class="pl-subnav pl-subnav-pill">
      <li class="pl-active" data-pl-filter-control><a href="#">Wszystko</a></li>
    <li data-pl-filter-control="[data-type='gory']"><a href="#">Góry</a></li>
    <li data-pl-filter-control="[data-type='woda']"><a href="#">Woda</a></li>
    <li data-pl-filter-control="[data-type='las']"><a href="#">Las</a></li>
    </ul>
    <button class="pl-button pl-button-small" type="button" id="demo-filter-easy">Łatwe górskie</button>
    <span class="pl-text-muted" id="demo-filter-count">8 tras</span>
  </div>
  <div class="pl-grid pl-grid-small pl-child-width-1-3 pl-child-width-1-4@m js-filter-api">
    <div data-type="gory" data-level="latwa"><img src="/img/photo-1.svg" alt="Hala Gąsienicowa" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
    <div data-type="woda"><img src="/img/photo-2.svg" alt="Jezioro Solińskie" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
    <div data-type="woda"><img src="/img/photo-3.svg" alt="Mierzeja Helska" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
    <div data-type="gory"><img src="/img/photo-4.svg" alt="Szczeliniec Wielki" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
    <div data-type="las"><img src="/img/photo-5.svg" alt="Biebrzańskie bagna" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
    <div data-type="gory"><img src="/img/photo-6.svg" alt="Dolina Chochołowska" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
    <div data-type="woda"><img src="/img/photo-7.svg" alt="Wigry" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
    <div data-type="las"><img src="/img/photo-8.svg" alt="Ojców" width="1200" height="800" style="border-radius: var(--pl-radius-md)"></div>
  </div>
</div>
```

```js example-js
const root = document.querySelector('#demo-filter-api');
const filter = Plossy.filter(root);
const count = document.querySelector('#demo-filter-count');

root.addEventListener('pl:afterfilter', (event) => {
  count.textContent = `Widoczne: ${event.detail.items.length}`;
});

document.querySelector('#demo-filter-easy').addEventListener('click', () => {
  filter.setState({ filter: { '': "[data-type='gory'][data-level='latwa']" } });
});
```

## API

### Opcje

| Opcja | Typ | Domyślnie | Opis |
| --- | --- | --- | --- |
| `target` | string | — | Selektor kontenera z elementami (szukany najpierw wewnątrz komponentu). |
| `sel-active` | string \| false | `false` | Selektor kontrolek aktywnych na starcie. |
| `animation` | string \| false | `slide` | `slide`, `fade`, `delayed-fade` lub `false`. |
| `duration` | number | `250` | Czas animacji (ms). |

### Kontrolki

| Wartość `data-pl-filter-control` | Działanie |
| --- | --- |
| *(pusta)* | Pokazuje wszystko i czyści grupy. |
| `[data-type='gory']` | Filtr — dowolny selektor CSS. |
| `filter: [data-level='latwa']; group: level` | Filtr w grupie; grupy łączą się warunkiem „i". |
| `group: level` | „Wszystko" w obrębie jednej grupy. |
| `sort: data-name; order: desc` | Sortowanie po atrybucie (`asc` domyślnie). |

### Metody

| Metoda | Opis |
| --- | --- |
| `apply(kontrolka)` | Stosuje kontrolkę tak jak kliknięcie. |
| `setState({ filter, sort })` | Ustawia stan: `filter` to obiekt `{ grupa: selektor }`, `sort` to `[atrybut, 'asc' \| 'desc']`. Zwraca `Promise`. |
| `getState()` | Zwraca bieżący stan. |
| `reset()` | Czyści filtry (sortowanie zostaje). |

### Zdarzenia

| Zdarzenie | Opis |
| --- | --- |
| `pl:beforefilter` | Przed filtrowaniem (`detail.state`); można anulować. |
| `pl:afterfilter` | Po zakończeniu animacji (`detail.state`, `detail.items` — widoczne elementy). |

### Klasy

| Klasa | Opis |
| --- | --- |
| `.pl-active` | Aktywna kontrolka. |
| `.pl-filter-bar` | Pasek z grupami kontrolek. |
| `.pl-filter-label` | Mała etykieta grupy. |
| `.pl-filter-count` | Licznik przy kontrolce. |
| `.pl-filter-empty` | Komunikat pokazywany, gdy nic nie pasuje. |
