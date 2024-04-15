Fånga den vardagliga ångesten med Jobbcentralen! Känn känslan av vårdcentral, telefonkö och byråkrati!


Frågor:
1: Det är ett verktyg för att förenkla användningen av Redux i projekt, den sköter vissa funktioner automatiskt, tex skapa reducers. Den hjälper en att skriva mindre kod och gör det lättare att organisera den.
2: Det är bäst i lite större projekt med många komponenter som vill komma åt och uppdatera global states. Det är enklare att hantera på ett och samma ställe för det minskar risken för fel och ökar prestandan. Man får inbyggda funktioner som att tex köra asynkron logik med thunk.
3:Man typar props med type eller interface för att säkerställa att man får rätt typ av data som input. Det blir tydligare och mindre fel om man typar useState, ex <{name: string, age: number} | null>(null), samma med event, man förtydligar vad som ska göras (ex React.ChangeEvent<HTMLInputElement>. Som jag fattar det så är det i stora drag så att typescript skriker ifall man gör nåt man inte borde och ber en vara specifik med vad man vill ha ut av funktionen.
