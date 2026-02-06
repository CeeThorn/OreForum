const form = document.getElementById("character-form");
const supabase_DB = supabase.createClient(supabaseUrl, supabaseKey);
const uploadImage = async (image) => {
  if (image.size === 0 || image.type === "application/octet-stream") {
    return;
  }
  const uploadResponse = await supabase_DB.storage
    .from("Character_Images")
    .upload(`images/${image.name}`, image);

  if (uploadResponse.error) {
    console.error("Error uploading image", uploadResponse.error.message);
    return;
  }
  const linkReponse = await supabase_DB.storage
    .from("Character_Images")
    .getPublicUrl(uploadResponse.data.path);
  if (linkReponse.error) {
    console.error("Error uploading image", linkReponse.error.message);
    return;
  }

  return linkReponse.publicUrl;
};
const uploadCharacter = async (character) => {
  if (!character.first_name || !character.last_name) {
    return;
  }
  const { status, statusText } = await supabase_DB
    .from("Characters")
    .insert(character);

  if (status !== 201) {
    console.error("Upload Failed", status);
    return;
  }
  return statusText;
};
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const link = await uploadImage(formData.get("character-image"));
  const character = Object.fromEntries(formData);
  //I used [_,value] because .entries returns key value pairs. I had to discard the key since I needed the value.
  const cleanedCharacters = Object.fromEntries(
    Object.entries(character).filter(
      ([_, value]) => String(value).trim() !== "",
    ),
  );
  delete cleanedCharacters["character-image"];
  if (link) {
    cleanedCharacters.image_link = link;
  }
  console.log(cleanedCharacters);
  uploadCharacter(cleanedCharacters);
});
