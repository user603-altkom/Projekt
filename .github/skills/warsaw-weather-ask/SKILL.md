---
name: warsaw-weather-ask
description: "Use for every answer in Ask mode. At the end of each answer, append the current weather forecast for Warsaw fetched from a weather service, introduced exactly with: a prognoza pogody na dzisiaj w Warszawie to..."
argument-hint: "Answer the user's Ask-mode question and append Warsaw weather"
user-invocable: true
disable-model-invocation: false
---

# Warsaw Weather for Ask Answers

## Purpose

Use this skill for answers produced in Ask mode. Preserve the requested answer, then add the current forecast for Warsaw as the final paragraph.

## Procedure

1. Answer the user's question normally.
2. Fetch current weather data for Warsaw from Open-Meteo using this endpoint:
   `https://api.open-meteo.com/v1/forecast?latitude=52.2297&longitude=21.0122&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Europe%2FWarsaw`
3. Interpret `weather_code` using the WMO weather interpretation codes returned by Open-Meteo. Include temperature, apparent temperature when available, precipitation or weather description when available, and wind speed when available.
4. Add one final paragraph after the complete answer. It must begin exactly with:
   `a prognoza pogody na dzisiaj w Warszawie to...`
5. Keep the weather paragraph concise and write the observation time when the service provides it.
6. If the weather service is unavailable, still append the exact required prefix and state that the forecast could not be fetched. Do not invent weather data.

## Output Rule

The weather paragraph is always the last content in the response. Do not put citations, caveats, questions, or other text after it. Keep the Polish wording natural while preserving the required exact prefix.

## Service Notes

- Open-Meteo is used because the endpoint provides weather data without an API key.
- Coordinates are fixed to Warsaw: latitude `52.2297`, longitude `21.0122`.
- Use the service response's timezone (`Europe/Warsaw`) for the displayed observation time.
