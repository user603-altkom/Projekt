# Ćw. 13 — Prośba, procedura, przymus

**Czas:** 40 min · **Każdy u siebie** · Sprawdzenie w dwójce

W Ćw. 12 czytałeś tabelę siedmiu mechanizmów. Tu tworzysz trzy z nich własnymi rękami
i sprawdzasz, który z nich naprawdę coś gwarantuje.

## Cel

Umieć wskazać, które dostosowanie agenta jest prośbą, a które warunkiem — i udowodnić
tę różnicę na własnym repozytorium, zamiast przyjąć ją z tabeli.

## Zgłoszenie

> To samo, które dostaliście przy pliku instrukcji:
>
> „Raz »poprawił« plik wejściowy w `dane/`, bo uznał go za zepsuty."
>
> Instrukcja z Ćw. 9 mówi, że danych wejściowych się nie zmienia. Pytanie brzmi, czy to
> wystarczy, żeby powiedzieć działowi ryzyka, że to się nie powtórzy.

## Kroki

1. **Sprawdź, ile jest warta sama prośba.** W trybie agentowym poproś o naprawienie
   niezgodności sumy kontrolnej w `dane/wyciag_2026_08.csv` — tak, jakbyś naprawdę uważał
   plik za zepsuty. Zobacz, czy instrukcja z Ćw. 9 go powstrzyma. Zapisz, co się stało,
   i cofnij wszystko, co zdążył zmienić.
2. **Zamknij tę drogę hookiem.** Zdarzenie `PreToolUse`, kod wyjścia 2 przy próbie zapisu
   w `dane/`. Format i pułapki: `.github/hooks/README.md`. Powtórz krok 1 i porównaj.
3. **Zapisz procedurę jako skill.** `.github/skills/` — procedura uzgadniania raportu
   z sumą kontrolną, ta, którą przechodziłeś w Ćw. 7. Sprawdź jedno: czy model sięga po nią
   sam, gdy opiszesz objaw własnymi słowami i ani razu nie wymienisz nazwy skilla.
4. **Zrób recenzenta, który nie może nic zepsuć.** `.github/agents/` — agent z białą listą
   narzędzi, bez zapisu plików. Każ mu zrecenzować `cwiczenia/cw10/zmiana.diff`, a potem
   każ mu poprawić to, co znalazł. Ma odmówić, i to nie dlatego, że jest grzeczny.
5. **Zapisz, co z tego przeżyje poniedziałek.** Pracujesz tu na VS Code. Przy każdej
   z trzech rzeczy dopisz, czy będzie ci dostępna w IDE, do którego wracasz, i skąd to wiesz.

> **Jeśli utknąłeś po 12 minutach**
> Zacznij od hooka i zrób go najgłupszym możliwym sposobem: jedna komenda, która zawsze
> kończy się kodem 2, podpięta pod `PreToolUse`. Kiedy zobaczysz, że blokuje wszystko,
> dopiero wtedy zawężaj ją do `dane/`. Bramka, której nie widziałeś działającej, nie jest
> bramką — a bramka blokująca za dużo jest łatwiejsza do zawężenia niż do zdiagnozowania.

> **Nie chcesz pisać skryptu w Node**
> Hook nie musi wołać pliku. `command` przyjmuje dowolne polecenie powłoki, więc warunek
> i kod wyjścia zmieścisz w jednej linijce. Reszta ćwiczenia bez zmian.

> **Skończyłeś wcześniej**
> Poproś agenta, żeby zmienił twój własny plik hooka albo listę narzędzi recenzenta.
> Uda mu się? Jeżeli tak, odpowiedz na pytanie, które z tego wynika: czym różni się bramka
> od pliku konfiguracyjnego, który pilnowany jest przez to samo, co ma pilnować. Odpowiedź
> zapisz na tablicy znalezisk, bo to jest pytanie dla ich działu bezpieczeństwa, nie dla ciebie.

## Gotowe, gdy

- [ ] pokazujesz partnerowi dwa przebiegi tego samego polecenia z kroku 1, przed hookiem
      i po nim, i widać na nich różnicę w zachowaniu, nie w tonie odpowiedzi
- [ ] twój recenzent odmawia zapisu, a ty umiesz wskazać w pliku linię, która mu tego zabrania
- [ ] przy każdej z trzech rzeczy masz zapisane, czy działa w IDE, do którego wracasz

## Na koniec ćwiczenia

```
git switch -c imie/cw13 && git add -A && git commit -m "cw13" --allow-empty && git switch main
```
