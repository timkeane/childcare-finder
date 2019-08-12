export const cardJSON = (feature)=>{
  return  [ "vcard",
  [
    [ "version", {}, "text", "4.0" ],
    [ "n", {}, "text", [ feature.getName()] ],
    [ "fn", {}, "text", feature.getName() ],
    //[ "org", {}, "text", feature.getName() ],
    //[ "title", {}, "text", feature.getName() ],
    [
      "photo", { "mediatype": "image/gif" },
      "text", "http://www.example.com/dir_photos/my_photo.gif"
    ],
    [ "tel", { "type": [ "work", "voice" ], "value": "uri" }, "uri", feature.getPhone() ],
    [ "tel", { "type": [ "home", "voice" ], "value": "uri" }, "uri", feature.getPhone()],
    [
      "adr", { "type": "work", "label":feature.getAddress1() },
      "text", [ "", "", feature.getAddress1() ]
    ],
    [
      "adr", { "type": "home", "label":  feature.getAddress1() },
      "text", [ "", "", feature.getAddress1() ]
    ],
    // [ "email", {}, "text", "forrestgump@example.com" ],
    [ "rev", {}, "text", "20080424T195243Z" ]
  ]
];
}