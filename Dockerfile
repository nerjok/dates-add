#build frontend
FROM node:24-alpine AS front-build

WORKDIR /app
COPY ./client/. .
RUN npm i && npm run build


FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build-env
WORKDIR /app
EXPOSE 8080

COPY ./speed-dates/* ./
RUN rm -rf ./wwwroot
RUN dotnet restore
RUN dotnet publish -c Release -o out


# # final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:9.0

WORKDIR /app
ENV ASPNETCORE_ENVIRONMENT=Production


COPY ssl/. /https/

COPY --from=build-env ./app/out .
COPY --from=front-build ./app/out ./wwwroot


ENTRYPOINT ["dotnet", "speed-dates.dll"]