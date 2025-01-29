import 'dotenv/config';
import * as joi from 'joi';

interface Envs {
	PORT: number;
	DATABASE_URL: string;
	POKEMON_MS_HOST: string;
	POKEMON_MS_PORT: number;
	POKEMON_MS_NAME: string;
	
	TRAINNER_MS_HOST: string;
	TRAINNER_MS_PORT: number;
	TRAINNER_MS_NAME: string;

	JWT_SECRET: string;
}

const envsSchema = joi
	.object({
		PORT: joi.number().required(),
		DATABASE_URL: joi.string(),
		POKEMON_MS_HOST: joi.string().required(),
		POKEMON_MS_PORT: joi.number().required(),
		POKEMON_MS_NAME: joi.string().required(),

		TRAINNER_MS_HOST: joi.string().required(),
		TRAINNER_MS_PORT: joi.number().required(),
		TRAINNER_MS_NAME: joi.string().required(),

		JWT_SECRET: joi.string().required(),
	})
	.unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
	throw new Error(`Config validation error: ${error.message}`);
}

const envs: Envs = value;

export const evns = {
	port: envs.PORT,
	databaseurl: envs.DATABASE_URL,
	pokemon_ms_host: envs.POKEMON_MS_HOST,
	pokemon_ms_port: envs.POKEMON_MS_PORT,
	pokemon_ms_name: envs.POKEMON_MS_NAME,

	trainner_ms_host: envs.TRAINNER_MS_HOST,
	trainner_ms_port: envs.TRAINNER_MS_PORT,
	trainner_ms_name: envs.TRAINNER_MS_NAME,

	jwt_secret: envs.JWT_SECRET,
};
