import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { coerce, z } from "zod";

extendZodWithOpenApi(z);

export default z;
