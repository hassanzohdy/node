import path from "path";

/**
 * Get the absolute path to the root of the project for the given path
 */
export function rootPath(...morePaths: string[]) {
  return path.join(process.cwd(), ...morePaths);
}

/**
 * Get the absolute path to the src directory for the given path
 */
export function srcPath(...morePaths: string[]) {
  return rootPath("src", ...morePaths);
}
