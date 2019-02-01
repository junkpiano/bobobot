const Telegraf = require("telegraf");
const axios = require("axios");

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start(ctx => ctx.reply("Welcome"));
bot.help(ctx => ctx.reply("Send me a sticker"));
bot.on("sticker", ctx => ctx.reply("👍"));
bot.hears("hi", ctx => ctx.reply("Hey there"));
bot.command("lunch9", ctx => {
	axios
		.get(
			"http://rakuten-towerman.azurewebsites.net/towerman-restapi/rest/cafeteria/menulist?menuDate=20190201"
		)
		.then(response => {
			const listMeals = response.data.data;
			ninthFloor = [];
			twentysecondFloor = [];

			for (var meal of listMeals) {
				if (meal.mealTime === 1) {
					if (meal.cafeteriaId == "9F") {
						ninthFloor.push({
							type: "photo",
							media: meal.imageURL
						});
					} else if (meal.cafeteriaId == "22F") {
						twentysecondFloor.push({
							type: "photo",
							media: meal.imageURL
						});
					}
				}
			}

			ctx.reply("9F");
			ctx.replyWithMediaGroup(ninthFloor);
		})
		.catch(error => {
			ctx.reply("sorry, something is wrong.");
		});
	ctx.reply("just a moment, please.");
});

bot.command("lunch22", ctx => {
	axios
		.get(
			"http://rakuten-towerman.azurewebsites.net/towerman-restapi/rest/cafeteria/menulist?menuDate=20190201"
		)
		.then(response => {
			const listMeals = response.data.data;
			ninthFloor = [];
			twentysecondFloor = [];

			for (var meal of listMeals) {
				if (meal.mealTime === 1) {
					if (meal.cafeteriaId == "9F") {
						ninthFloor.push({
							type: "photo",
							media: meal.imageURL
						});
					} else if (meal.cafeteriaId == "22F") {
						twentysecondFloor.push({
							type: "photo",
							media: meal.imageURL
						});
					}
				}
			}

			ctx.reply("22F");
			ctx.replyWithMediaGroup(twentysecondFloor);
		})
		.catch(error => {
			ctx.reply("sorry, something is wrong.");
		});
	ctx.reply("just a moment, please.");
});

bot.command("dinner9", ctx => {
	axios
		.get(
			"http://rakuten-towerman.azurewebsites.net/towerman-restapi/rest/cafeteria/menulist?menuDate=20190201"
		)
		.then(response => {
			const listMeals = response.data.data;
			ninthFloor = [];
			twentysecondFloor = [];

			for (var meal of listMeals) {
				if (meal.mealTime === 2) {
					if (meal.cafeteriaId == "9F") {
						ninthFloor.push({
							type: "photo",
							media: meal.imageURL
						});
					} else if (meal.cafeteriaId == "22F") {
						twentysecondFloor.push({
							type: "photo",
							media: meal.imageURL
						});
					}
				}
			}

			ctx.reply("9F");
			ctx.replyWithMediaGroup(ninthFloor);
		})
		.catch(error => {
			ctx.reply("sorry, something is wrong.");
		});
	ctx.reply("just a moment, please.");
});

bot.command("dinner22", ctx => {
	axios
		.get(
			"http://rakuten-towerman.azurewebsites.net/towerman-restapi/rest/cafeteria/menulist?menuDate=20190201"
		)
		.then(response => {
			const listMeals = response.data.data;
			ninthFloor = [];
			twentysecondFloor = [];

			for (var meal of listMeals) {
				if (meal.mealTime === 2) {
					if (meal.cafeteriaId == "9F") {
						ninthFloor.push({
							type: "photo",
							media: meal.imageURL
						});
					} else if (meal.cafeteriaId == "22F") {
						twentysecondFloor.push({
							type: "photo",
							media: meal.imageURL
						});
					}
				}
			}

			ctx.reply("22F");
			ctx.replyWithMediaGroup(twentysecondFloor);
		})
		.catch(error => {
			ctx.reply("sorry, something is wrong.");
		});
	ctx.reply("just a moment, please.");
});
bot.launch();
