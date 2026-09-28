/* ============================================================
   The Discovery Map — data
   ------------------------------------------------------------
   To add a discovery, append one object to the array below. Nothing
   else in map.html needs to change: markers, filters, the timeline
   and the language chips are all generated from this list.

   Fields
     id            unique slug
     name          heading on the card (short, shown in caps)
     site          site name (used for the hover preview + zoomed map label)
     location      "Site, modern country" line shown in the preview + card
     lat, lon      decimal degrees (approximate site centre)
     year          single number that currently drives sorting/filtering.
                   Historically a mix of discovery / recognition /
                   publication years depending on the entry — kept as-is
                   for now so nothing downstream breaks. New code should
                   prefer discoveryYear / scholarshipYear below; once
                   everything reads from those, this field can retire.
     discoveryYear year the object/text was physically found or excavated
                   (approximate where sources only give a decade)
     scholarshipYear year the find was identified, deciphered, or
                   published and entered modern scholarship — this is
                   the sense the exhibit's own language means by
                   "discovered"
     discovered    display text for the DISCOVERED field / hover preview
     foundBy       excavator / expedition / finder
     dates         approximate ancient date of the object or text
     found         WHAT WAS FOUND  (1–2 sentences)
     why           WHY IT MATTERED (2–4 sentences — the payoff)
     biblical      array of related passages (empty array = none shown)
     types         any of: 'texts' | 'inscriptions' | 'manuscripts' | 'archives'
     region        'israel' | 'mesopotamia' | 'canaan' | 'egypt'
     languages     array of language names
     link          optional { label, url } for the VIEW ARTIFACT link
     nudge         optional [dx, dy] in screen px, used only to fan out
                   markers that would otherwise sit on top of each other
     noLabel       optional true: skip the zoomed-in map label (used when
                   two finds share one site)
   ============================================================ */

window.MAP_DISCOVERIES = [
  {
    id: 'enuma-elish',
    name: 'Enūma Eliš',
    site: 'Nineveh',
    location: 'Nineveh (Kouyunjik), Iraq',
    lat: 36.36, lon: 43.15,
    year: 1849,
    discovered: 'Fragments excavated 1848–1876; identified and published in the 1870s',
    discoveryYear: 1848,
    scholarshipYear: 1876,
    foundBy: 'Austen Henry Layard and Hormuzd Rassam (excavation); George Smith and later scholars (identification)',
    dates: 'Composed in the later second millennium BCE; Nineveh copies date to the 7th century BCE',
    found: 'The Babylonian creation epic, recovered in fragments among the tens of thousands of tablets in Ashurbanipal’s royal library. It tells how Marduk defeats Tiamat and builds the ordered cosmos from her body.',
    why: 'When George Smith published the creation tablets in 1876, readers saw for the first time that Genesis 1 belonged to a much wider ancient Near Eastern conversation about primordial waters, cosmic order, and divine rule. The similarities launched comparative study of the Bible; the differences sharpened the question of what Genesis was doing distinctively within that shared cultural world.',
    biblical: ['Genesis 1:1–2:3'],
    types: ['texts', 'archives'],
    region: 'mesopotamia',
    languages: ['Akkadian'],
    nudge: [-13, -9]
  },
  {
    id: 'flood-tablet',
    name: 'Gilgamesh — Flood Tablet',
    site: 'Nineveh',
    location: 'Nineveh (Kouyunjik), Iraq',
    lat: 36.36, lon: 43.15,
    year: 1872,
    discovered: 'Recognized 1872 (excavated 1850s)',
    discoveryYear: 1850,
    scholarshipYear: 1872,
    foundBy: 'Excavated by Hormuzd Rassam; identified by George Smith of the British Museum',
    dates: 'Tablet copied in the 7th century BCE; the story is far older',
    found: 'Tablet XI of the Standard Babylonian Epic of Gilgamesh, in which Utnapishtim tells of the great flood, the vessel he built, and the birds he released to find dry land.',
    why: 'When Smith announced the tablet in December 1872, the world learned that Mesopotamia had preserved its own flood story, complete with a boat, a mountain landing, and released birds. Later finds showed the tradition ran back centuries before the Nineveh copy, so the question shifted from whether Genesis 6–9 had a Mesopotamian counterpart to how Genesis inherited that shared flood tradition and reshaped it around its own view of God and human responsibility.',
    biblical: ['Genesis 6–9'],
    types: ['texts', 'archives'],
    region: 'mesopotamia',
    languages: ['Akkadian'],
    link: { label: 'View artifact', url: 'https://www.britishmuseum.org/collection/object/W_K-3375' },
    nudge: [13, 9],
    noLabel: true
  },
  {
    id: 'mesha-stele',
    name: 'Mesha Stele',
    site: 'Dhiban',
    location: 'Dhiban (biblical Dibon), Jordan',
    lat: 31.50, lon: 35.78,
    year: 1868,
    discovered: '1868',
    discoveryYear: 1868,
    scholarshipYear: 1868,
    foundBy: 'F. A. Klein, a missionary; a squeeze was made by Charles Clermont-Ganneau before the stone was broken',
    dates: 'About 840 BCE',
    found: 'A black basalt monument with a 34-line inscription in Moabite, in which King Mesha of Moab tells of throwing off Israelite rule and of his building projects. It is now in the Louvre.',
    why: 'The stele names Israel, the house of Omri, and YHWH from the perspective of a ninth-century Moabite king. It overlaps with the political world described in 2 Kings 3 without simply retelling the same episode, giving scholars an independent and distinctly Moabite account of conflict with Israel. Its 34-line inscription is also a major witness to Moabite, a Northwest Semitic language very closely related to Hebrew.',
    biblical: ['2 Kings 3:4–27'],
    types: ['inscriptions'],
    region: 'egypt',
    languages: ['Moabite']
  },
  {
    id: 'siloam',
    name: 'Siloam Inscription',
    site: 'Jerusalem',
    location: 'City of David, Jerusalem',
    lat: 31.772, lon: 35.236,
    year: 1880,
    discovered: '1880',
    discoveryYear: 1880,
    scholarshipYear: 1880,
    foundBy: 'A schoolboy in Jerusalem, reported to Conrad Schick and published by A. H. Sayce',
    dates: '8th century BCE; exact date debated',
    found: 'A six-line Paleo-Hebrew inscription carved into the wall of a water tunnel, describing the moment when two teams digging from opposite ends broke through and met.',
    why: 'The inscription gives a rare contemporary account of the engineering feat by which two teams cut a tunnel toward one another through Jerusalem’s bedrock. The tunnel has traditionally been identified with the waterworks attributed to Hezekiah in 2 Kings 20:20 and 2 Chronicles 32:30, although its exact date and that identification remain debated. The inscription is also one of the most substantial surviving Hebrew texts from Iron Age Judah and an important witness to the development of Hebrew writing.',
    biblical: ['2 Kings 20:20', '2 Chronicles 32:30'],
    types: ['inscriptions'],
    region: 'israel',
    languages: ['Hebrew'],
    nudge: [12, 10]
  },
  {
    id: 'amarna',
    name: 'Amarna Letters',
    site: 'Tell el-Amarna',
    location: 'Tell el-Amarna (ancient Akhetaten), Egypt',
    lat: 27.645, lon: 30.90,
    year: 1887,
    discovered: '1887',
    discoveryYear: 1887,
    scholarshipYear: 1891,
    foundBy: 'Local villagers digging at the site; studied by Flinders Petrie and others from 1891',
    dates: 'About 1360–1332 BCE',
    found: 'Roughly 380 clay tablets from the archive of the Egyptian pharaohs, mostly diplomatic letters in Akkadian between Egypt and the rulers of Canaan, Syria, Babylonia, Mitanni, and Hatti.',
    why: 'The letters gave scholars their first contemporary portrait of Canaan’s city-states, including Jerusalem, Shechem, and Lachish, in the period before Israel appears in the historical record. They showed Akkadian serving as the diplomatic language of the whole region. The letters also refer to Ḫabiru or ʿApiru groups. Early scholars connected them directly with the Hebrews, but that identification is no longer generally accepted.',
    biblical: ['Background to Joshua and Judges'],
    types: ['texts', 'archives'],
    region: 'egypt',
    languages: ['Akkadian']
  },
  {
    id: 'elephantine',
    name: 'Elephantine Papyri',
    site: 'Elephantine',
    location: 'Elephantine Island (Aswan), Egypt',
    lat: 24.086, lon: 32.887,
    year: 1893,
    discovered: '1893–1908',
    discoveryYear: 1893,
    scholarshipYear: 1908,
    foundBy: 'Papyri bought by collectors from 1893, then German excavations under Otto Rubensohn, 1906–1908',
    dates: '5th century BCE',
    found: 'Contracts, letters, and legal records in Aramaic from a Jewish military garrison in southern Egypt, including correspondence about their own temple to “Yahu.”',
    why: 'The papyri revealed a Jewish community in Persian-period Egypt that had its own temple, offered sacrifices, and wrote to the governor of Judah and the priests in Jerusalem for help in rebuilding it after its destruction. This changed assumptions about Jewish life after the exile, showing a diversity of practice that does not match a single centralized pattern. They also preserve one of the best bodies of Persian-period Aramaic.',
    biblical: ['Ezra', 'Nehemiah', 'Deuteronomy 12'],
    types: ['manuscripts', 'archives'],
    region: 'egypt',
    languages: ['Aramaic']
  },
  {
    id: 'nuzi',
    name: 'Nuzi Tablets',
    site: 'Nuzi',
    location: 'Yorghan Tepe (ancient Nuzi), near Kirkuk, Iraq',
    lat: 35.36, lon: 44.25,
    year: 1925,
    discovered: '1925–1931',
    discoveryYear: 1925,
    scholarshipYear: 1931,
    foundBy: 'Edward Chiera, Robert Pfeiffer, and Richard Starr for Harvard and the American Schools of Oriental Research',
    dates: 'About 15th–14th century BCE',
    found: 'Thousands of family and legal tablets in Akkadian from a Hurrian community, dealing with adoption, inheritance, marriage, and land.',
    why: 'For a generation, scholars believed Nuzi’s family law explained puzzling customs in the patriarchal stories, such as Rachel’s household gods or Sarah’s gift of Hagar. Later study showed that many of these parallels were weaker, or from the wrong period, than first claimed. Nuzi therefore became a lasting lesson in the care needed when comparing ancient texts, while still illuminating the legal world of the Late Bronze Age Near East.',
    biblical: ['Genesis 16', 'Genesis 31'],
    types: ['texts', 'archives'],
    region: 'mesopotamia',
    languages: ['Akkadian']
  },
  {
    id: 'ugarit',
    name: 'Ugarit',
    site: 'Ras Shamra',
    location: 'Ras Shamra (ancient Ugarit), Syria',
    lat: 35.60, lon: 35.78,
    year: 1929,
    discovered: '1928–1929',
    discoveryYear: 1928,
    scholarshipYear: 1930,
    foundBy: 'Claude Schaeffer and Georges Chenet; deciphered in 1930 by Hans Bauer, Édouard Dhorme, and Charles Virolleaud',
    dates: 'About 1400–1200 BCE',
    found: 'The archives of a Late Bronze Age Canaanite port city, including thousands of tablets in a previously unknown alphabetic cuneiform script. They include the Baal Cycle and other myths and epics.',
    why: 'The discovery of Ugaritic texts dramatically expanded scholars’ knowledge of the language, religion, and poetry of ancient Canaan. Their vocabulary and imagery illuminated difficult Hebrew words and passages and provided crucial context for biblical references to El, Baal, the divine council, storm imagery, and Canaanite religion.',
    biblical: ['Psalm 29', 'Psalm 82', 'Judges 2:11–13', '1 Kings 18'],
    types: ['texts', 'archives'],
    region: 'canaan',
    languages: ['Ugaritic']
  },
  {
    id: 'mari',
    name: 'Mari Tablets',
    site: 'Mari',
    location: 'Tell Hariri (ancient Mari), Syria',
    lat: 34.55, lon: 40.89,
    year: 1933,
    discovered: '1933 onward',
    discoveryYear: 1933,
    scholarshipYear: 1933,
    foundBy: 'André Parrot',
    dates: 'About 1800–1760 BCE',
    found: 'The palace archive of Mari: more than twenty thousand tablets in Akkadian, including royal letters, administrative records, and reports of prophetic messages.',
    why: 'The Mari letters show prophets delivering messages from the gods to kings roughly a millennium before Israel’s classical writing prophets, placing biblical prophecy within a wider ancient Near Eastern practice. They also describe Amorite tribal life, including groups with names like the Yaminites, and a treaty ritual involving the killing of a donkey foal, which resembles the biblical language of “cutting” a covenant. They illuminate the social world behind biblical traditions without proving that any particular story took place.',
    biblical: ['Genesis 15', 'Jeremiah 34:18–19', 'The prophets generally'],
    types: ['texts', 'archives'],
    region: 'canaan',
    languages: ['Akkadian']
  },
  {
    id: 'lachish',
    name: 'Lachish Letters',
    site: 'Lachish',
    location: 'Tel Lachish, Israel',
    lat: 31.56, lon: 34.85,
    year: 1935,
    discovered: '1935 and 1938',
    discoveryYear: 1935,
    scholarshipYear: 1938,
    foundBy: 'James Leslie Starkey (Wellcome–Marston Archaeological Research Expedition)',
    dates: 'About 588 BCE',
    found: 'Twenty-one ostraca, letters written in ink on pieces of broken pottery, many from a military officer to his superior, in the last months before the Babylonian conquest of Judah.',
    why: 'These letters give a first-person glimpse of Judah in its final crisis, with officers reporting on signals from neighboring fortresses as Nebuchadnezzar’s army advanced. One letter reports that the signals of Azekah can no longer be seen, an echo of Jeremiah 34:7, which names Lachish and Azekah as the last fortified cities still standing. They also preserve a rare body of everyday Hebrew prose from the period of the late monarchy.',
    biblical: ['Jeremiah 34:7', '2 Kings 25'],
    types: ['inscriptions'],
    region: 'israel',
    languages: ['Hebrew']
  },
  {
    id: 'dead-sea-scrolls',
    name: 'Dead Sea Scrolls',
    site: 'Qumran',
    location: 'Qumran caves, near the Dead Sea, West Bank',
    lat: 31.741, lon: 35.459,
    year: 1946,
    discovered: '1946/47–1956',
    discoveryYear: 1947,
    scholarshipYear: 1956,
    foundBy: 'Bedouin shepherds, followed by excavations led by Roland de Vaux and Gerald Lankester Harding',
    dates: 'About 250 BCE–68 CE',
    found: 'Fragments of roughly nine hundred manuscripts from eleven caves, including portions of every book of the Hebrew Bible except Esther, alongside sectarian writings and other Second Temple texts.',
    why: 'The scrolls pushed surviving biblical manuscripts roughly a thousand years earlier than the medieval Hebrew codices previously available to scholars. They revealed both remarkable textual continuity and genuine textual variation, transforming the study of how the Hebrew Bible was transmitted before the standard Masoretic tradition emerged.',
    biblical: ['Isaiah', 'Psalms', 'Deuteronomy 32', 'Nearly the entire Hebrew Bible'],
    types: ['manuscripts', 'archives'],
    region: 'israel',
    languages: ['Hebrew', 'Aramaic', 'Greek'],
    link: { label: 'View artifact', url: 'https://dss.collections.imj.org.il/' }
  },
  {
    id: 'deir-alla',
    name: 'Deir ʿAlla Inscription',
    site: 'Deir ʿAlla',
    location: 'Tell Deir ʿAlla, Jordan',
    lat: 32.19, lon: 35.62,
    year: 1967,
    discovered: '1967',
    discoveryYear: 1967,
    scholarshipYear: 1967,
    foundBy: 'H. J. Franken (Leiden expedition)',
    dates: 'About 800 BCE',
    found: 'Fragments of a plaster wall text, written in red and black ink, telling of a seer named Balaam son of Beor who receives a vision from the gods.',
    why: 'The inscription names a seer called Balaam son of Beor, matching the name and patronymic of the figure in Numbers 22–24, while telling a very different story about him. It strongly suggests that traditions about Balaam circulated in Transjordan outside the biblical text. The inscription also gives scholars a rare glimpse of non-Israelite prophetic or divinatory traditions and preserves a Northwest Semitic dialect whose classification remains debated.',
    biblical: ['Numbers 22–24'],
    types: ['inscriptions'],
    region: 'egypt',
    languages: ['Deir ʿAlla dialect']
  },
  {
    id: 'ebla',
    name: 'Ebla Tablets',
    site: 'Ebla',
    location: 'Tell Mardikh (ancient Ebla), Syria',
    lat: 35.80, lon: 36.80,
    year: 1974,
    discovered: '1974–1976',
    discoveryYear: 1974,
    scholarshipYear: 1976,
    foundBy: 'Paolo Matthiae and the Italian Archaeological Expedition of Sapienza University of Rome',
    dates: 'About 2400–2300 BCE',
    found: 'A royal archive of some seventeen thousand tablets and fragments in Sumerian and Eblaite, a previously unknown early Semitic language.',
    why: 'Ebla revealed a large, literate, urban culture in northern Syria well over a thousand years before the Israelite monarchy. Early publicity claimed direct links to Genesis, such as references to Sodom and Gomorrah, but later study did not support them, making Ebla a cautionary example of overreach. Its lasting value is the depth it adds to the scribal and linguistic history of the region that the biblical writers later inhabited.',
    biblical: [],
    types: ['texts', 'archives'],
    region: 'canaan',
    languages: ['Eblaite', 'Sumerian']
  },
  {
    id: 'kuntillet-ajrud',
    name: 'Kuntillet ʿAjrud Inscriptions',
    site: 'Kuntillet ʿAjrud',
    location: 'Kuntillet ʿAjrud, northeastern Sinai, Egypt',
    lat: 30.313, lon: 34.43,
    year: 1975,
    discovered: '1975–1976',
    discoveryYear: 1975,
    scholarshipYear: 1976,
    foundBy: 'Ze’ev Meshel (Tel Aviv University)',
    dates: 'About 800 BCE',
    found: 'Inscriptions and drawings on plaster and on large storage jars at a desert way-station, including blessings “by Yahweh of Samaria and his asherah” and “by Yahweh of Teman and his asherah.”',
    why: 'These inscriptions provide firsthand evidence for forms of YHWH worship in the early eighth-century southern Levant, outside the retrospective biblical narratives. References to “YHWH of Samaria,” “YHWH of Teman,” and “his asherah” opened an enduring debate over localized forms of YHWH worship and whether asherah here denotes the goddess, a cult object, or another associated symbol. The finds complicate any picture of Israelite religion as uniform in this period.',
    biblical: ['Deuteronomy 16:21', '1 Kings 15:13', '2 Kings 21:7'],
    types: ['inscriptions'],
    region: 'israel',
    languages: ['Hebrew']
  },
  {
    id: 'ketef-hinnom',
    name: 'Ketef Hinnom Silver Scrolls',
    site: 'Ketef Hinnom',
    location: 'Hinnom Valley, Jerusalem',
    lat: 31.769, lon: 35.2247,
    year: 1979,
    discovered: '1979',
    discoveryYear: 1979,
    scholarshipYear: 1979,
    foundBy: 'Gabriel Barkay',
    dates: 'About 600 BCE (late 7th–early 6th century)',
    found: 'Two tiny rolled silver amulets from a burial cave, inscribed in Paleo-Hebrew with a version of the priestly blessing. They took years to unroll safely.',
    why: 'The amulets preserve the earliest known form of language closely paralleling the Priestly Blessing in Numbers 6:24–26, several centuries before the Dead Sea Scrolls. They show that this blessing circulated in Jerusalem before the Babylonian exile, apparently in an amuletic or protective context. Whether the wording was already part of the book of Numbers in its present form is a separate question.',
    biblical: ['Numbers 6:24–26'],
    types: ['inscriptions'],
    region: 'israel',
    languages: ['Hebrew'],
    nudge: [-13, -9]
  },
  {
    id: 'tel-dan',
    name: 'Tel Dan Stele',
    site: 'Tel Dan',
    location: 'Tel Dan, northern Israel',
    lat: 33.248, lon: 35.652,
    year: 1993,
    discovered: '1993–1994',
    discoveryYear: 1993,
    scholarshipYear: 1993,
    foundBy: 'Avraham Biran’s excavation team; the inscription was published by Biran and Joseph Naveh',
    dates: 'About 9th century BCE',
    found: 'Fragments of a basalt victory monument in Aramaic, probably erected by an Aramean king, reused in a later wall.',
    why: 'The inscription refers to a “house of David,” the earliest widely accepted mention of David’s dynasty outside the Bible. Its publication in 1993 reshaped the debate over the historical David, supporting a real dynasty by the ninth century without settling how large or powerful it was. It also presents the wars of Israel’s kings from the Aramean side of the border.',
    biblical: ['2 Samuel 7', '2 Kings 8:28–10:14'],
    types: ['inscriptions'],
    region: 'israel',
    languages: ['Aramaic']
  }
];
