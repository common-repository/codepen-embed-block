export default function getPenID(penURL) {
  let matches_array = penURL.match(
    /http[s]?:\/\/codepen\.io\/(?:team\/)?[\w-]+\/(?:pen|details|full|pres|debug|live|embed)\/([A-Z-a-z0-9\/]{32,}|[A-Za-z]{5,8})\/?/
  );
  return Array.isArray(matches_array) ? matches_array[1] : null;
}

// https://regex101.com/r/r9CyfL/1
