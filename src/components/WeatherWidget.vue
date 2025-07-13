<template>
  <div class="weather-widget">
    <div class="weather-header">
      <h2>Hava Durumu</h2>
      <input
        type="text"
        v-model="cityName"
        @keyup.enter="getResult"
        placeholder="Şehir giriniz"
        class="weather-input"
      />
    </div>
    <div class="weather-content" v-if="city">
      <div class="weather-city">{{ city }}, {{ country }}</div>
      <div class="weather-temp">{{ temp }}°C</div>
      <div class="weather-desc">{{ description }}</div>
      <div class="weather-minmax">{{ tempMin }}°C / {{ tempMax }}°C</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherWidget",
  data() {
    return {
      cityName: "",
      city: "İstanbul",
      country: "TR",
      temp: 15,
      description: "Güneşli",
      tempMin: 15,
      tempMax: 19,
    };
  },
  methods: {
    async getResult() {
      if (this.cityName.trim() === "") return;

      const url = "https://api.openweathermap.org/data/2.5/weather";
      const key = process.env.VUE_APP_OPENWEATHER_API_KEY;
      const query = `${url}?q=${this.cityName}&appid=${key}&units=metric&lang=tr`;

      try {
        const response = await fetch(query);
        const result = await response.json();

        if (result.cod === 200) {
          this.city = result.name;
          this.country = result.sys.country;
          this.temp = Math.round(result.main.temp);
          this.description = result.weather[0].description.toUpperCase();
          this.tempMin = Math.round(result.main.temp_min);
          this.tempMax = Math.round(result.main.temp_max);
        } else {
          alert("Şehir bulunamadı");
        }
      } catch (error) {
        alert("Bir hata oluştu");
      }
    },
  },
};
</script>

<style scoped>
.weather-widget {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 20px;
  max-width: 320px;
  width: 100%;
  margin: 0 auto;
  font-family: sans-serif;
}

.weather-header {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}

.weather-header h2 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.weather-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.weather-content {
  text-align: center;
}

.weather-city {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
}

.weather-temp {
  font-size: 32px;
  color: #007bff;
  font-weight: bold;
}

.weather-desc {
  font-size: 14px;
  color: #666;
  margin: 5px 0;
}

.weather-minmax {
  font-size: 13px;
  color: #999;
}
</style>
