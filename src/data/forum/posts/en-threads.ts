import type { ForumComment, ForumPost } from '../types';

function categoryTone(category: string): ForumPost['categoryTone'] {
  if (category === 'Features & Questions') return 'blue';
  if (category === 'Updates & Status') return 'orange';
  if (category === 'Safety & Account Questions' || category === 'Help & Support') return 'green';
  return 'purple';
}

function post(
  data: Omit<ForumPost, 'age' | 'commentsCount' | 'categoryTone'> & { comments: ForumComment[] },
): ForumPost {
  return {
    ...data,
    categoryTone: categoryTone(data.category),
    age: '',
    commentsCount: data.comments.length,
  };
}

const c = (author: string, body: string, score = 4): ForumComment => ({ author, age: '', score, body });

export const forumPostsEn: ForumPost[] = [
  post({
    slug: 'wardogs-three-team-control-zone-strategy',
    category: 'General Discussion',
    title: 'How do you approach a WARDOGS match when three teams are fighting over one zone?',
    excerpt:
      'Three teams fighting over the same objective can turn a clean push into complete chaos. Discuss positioning, timing, and how to avoid getting caught between rival squads.',
    author: 'rustycompass',
    published: '2026-07-29',
    upvotes: 48,
    sourceTitle: "Wardogs Cheats Buyer's Guide: What to Check Before You Buy",
    sourcePath: '/blog/wardogs-cheats-buyers-guide/',
    body: [
      "I've been trying to understand what actually matters most in WARDOGS. With three teams contesting a zone, it seems like winning one fight doesn't necessarily mean you've made a good play.",
      'You can clear one side and immediately get pushed from another. Meanwhile, everybody seems to be spending money on gear and vehicles.',
      'What do you think matters most here: holding the zone, watching the surrounding approaches, or waiting for the other teams to fight first?',
      "I'm interested in actual strategy discussion, not another list of generic FPS tips.",
    ],
    comments: [
      c('mapgremlin', 'Positioning, honestly. Winning a gunfight and then standing in the open celebrating is a classic way to get introduced to team number three.', 6),
      c('brickbybrick', "The building and destruction mechanics make it interesting too. I wouldn't assume a building is going to stay useful as cover forever.", 5),
      c('lowbudgetloadout', 'People also need to think about the cash economy. Buying expensive gear every single life without a plan sounds like a speedrun to an empty wallet lol.', 7),
      c('sectorseven', "I disagree a little on waiting for other teams. If everyone waits, nobody takes the zone. Timing matters, but somebody still has to commit.", 4),
      c('no_scope_nana', 'The best plan is apparently to enter the zone confidently and then discover that the entire server had the same idea.', 9),
      c('rustycompass', 'That last part sounds painfully believable as a general WARDOGS strategy problem. The three-team setup definitely makes positioning more complicated than a normal two-sided fight.', 3),
    ],
  }),
  post({
    slug: 'wardogs-esp-vs-radar-difference',
    category: 'Features & Questions',
    title: 'WARDOGS ESP vs radar: what is the actual difference?',
    excerpt:
      'ESP and radar often appear next to each other in cheat feature lists, but the descriptions can be confusing. Here\'s a discussion about what those labels generally mean and what buyers should verify.',
    author: 'packetpigeon',
    published: '2026-08-04',
    upvotes: 41,
    sourceTitle: 'Wardogs ESP and Radar Explained',
    sourcePath: '/blog/wardogs-esp-radar-explained/',
    body: [
      'Can someone explain the difference between ESP and radar in WARDOGS cheat listings?',
      'I get the basic idea that both involve information about other players, but a lot of product descriptions put them in the same feature category without explaining what makes them different.',
      'Does ESP normally mean labels and boxes drawn over the game, while radar means a separate map or radar display?',
      'Also, do all products that advertise these names necessarily offer the same features? The descriptions are all over the place.',
    ],
    comments: [
      c('greyscale', "That's generally the distinction, yeah. ESP usually means information drawn onto the game view. Radar usually means a separate positional display.", 5),
      c('tinyhitbox', "The names aren't a standardized guarantee, though. One listing might mention player names and distance, another might mean something else entirely.", 4),
      c('mousetrap99', 'I\'d check whether the feature list actually explains what is displayed. Just saying "advanced ESP" tells you approximately nothing.', 6),
      c('vectorbread', 'Exactly. Does the description mention players, items, vehicles, health, distance, or something else? Those details matter much more than how fancy the heading sounds.', 5),
      c('aimlesswanderer', "Also, features advertised on a page aren't proof they're currently compatible with the latest game version. Those are separate questions.", 4),
      c(
        'packetpigeon',
        'Good point. So the sensible comparison is the actual documented [Wardogs cheat](/wardogs-cheats) feature list and its current compatibility, not just ESP versus radar as two buzzwords. For patch questions, use [support](/support/).',
        3,
      ),
    ],
  }),
  post({
    slug: 'wardogs-aimbot-settings-fov-prediction',
    category: 'Features & Questions',
    title: 'WARDOGS aimbot settings explained: FOV, prediction, and target checks',
    excerpt:
      'FOV, prediction, target checks, and hitbox options can be difficult to compare across listings. This thread breaks down the terminology and highlights what a feature description should clarify.',
    author: 'pixelpanicked',
    published: '2026-08-12',
    upvotes: 37,
    sourceTitle: 'Wardogs Aimbot Settings: Setting Up Aim, No Recoil and No Spread',
    sourcePath: '/blog/wardogs-aimbot-settings/',
    body: [
      "I'm comparing a few WARDOGS cheat feature lists and the aim section is full of terms that sound similar.",
      'FOV, aim prediction, visibility checks, hitbox selection, target switching. I understand the broad idea, but it\'s difficult to tell which options are genuinely different and which are just fancy descriptions.',
      "Could somebody explain the terms in plain English? I'd rather understand what a listing actually promises than assume every product has the same implementation.",
    ],
    comments: [
      c('syntaxerror', 'FOV is basically the area in which the aim feature considers targets. At least, that\'s what the term generally refers to in these listings.', 5),
      c('bodega_bandit', 'Prediction is about accounting for movement rather than only where something appears at one instant. The precise implementation depends on the software.', 4),
      c('fern.exe', 'Visibility checks usually mean checking whether a target is considered visible before an action happens. You\'d want the seller to explain exactly what that means for their product.', 5),
      c('ctrlaltdefeat', 'Hitbox selection refers to which part of a target the software considers. Target switching is about changing from one selected target to another.', 4),
      c('brisketfps', 'Ngl, product descriptions can turn a simple checkbox into a paragraph of marketing. Ask for documentation instead of guessing based on the name.', 7),
      c('pixelpanicked', "That's the kind of explanation I was looking for. I'll compare documented behavior rather than assume every listing uses the terms identically.", 3),
    ],
  }),
  post({
    slug: 'wardogs-cheats-status-after-game-update',
    category: 'Updates & Status',
    title: 'How can you check whether a WARDOGS cheat is updated after a game patch?',
    excerpt:
      'Game updates can change software compatibility. Discuss where status information should be published, what a useful update notice looks like, and why an unsupported green status label shouldn\'t be treated as a guarantee.',
    author: 'stalecache',
    published: '2026-08-24',
    upvotes: 44,
    sourceTitle: 'Wardogs Cheat Not Working? Common Problems and Fixes',
    sourcePath: '/blog/wardogs-cheat-not-working/',
    body: [
      "What's the best way to check WARDOGS cheat compatibility after the game updates?",
      "A page might still be online and accepting orders, but that doesn't necessarily tell me whether the software has been checked against the current version.",
      "I'd expect a decent status system to say whether the product is confirmed compatible, being updated, or waiting for verification.",
      'What information do you usually look for before trusting an update notice?',
    ],
    comments: [
      c('logfilesonly', 'A timestamp would be useful. "Updated recently" means very little if nobody says when.', 5),
      c('ramenfps', 'I\'d want the actual status to be clear. Something like "compatibility not yet confirmed" is more useful than pretending everything is fine.', 6),
      c('crashcart', 'And a changelog, preferably. If nothing changed, just say that. Nobody needs a dramatic announcement for every tiny update lol.', 4),
      c('squareone', "I'd also separate game compatibility from operating-system compatibility. Those are related but not the same thing.", 4),
      c('bytebandit', "Biggest red flag is a page promising permanent compatibility. Games and enforcement systems change. A seller can't honestly promise that software will always work or stay undetected.", 8),
      c('stalecache', "Agreed. I'd rather see a plain status with a timestamp than a giant green badge with no explanation.", 3),
    ],
  }),
  post({
    slug: 'wardogs-cheats-ban-risk-account-safety',
    category: 'Safety & Account Questions',
    title: 'Can using WARDOGS cheats get your account banned?',
    excerpt:
      'Considering third-party tools for WARDOGS? Discuss the official rules, possible account penalties, and why claims about being completely undetectable should be treated cautiously.',
    author: 'cautiousgoblin',
    published: '2026-09-01',
    upvotes: 52,
    sourceTitle: 'Are Wardogs Cheats Safe? What to Know About Risk and Bans',
    sourcePath: '/blog/are-wardogs-cheats-safe/',
    body: [
      'Question for anyone researching WARDOGS cheats: how seriously should the ban risk be taken?',
      "I keep coming back to the same issue. A product listing can make all kinds of claims about detection, but the seller isn't the one who loses access to the account if something goes wrong.",
      'Does the official policy make a distinction between different types of third-party tools, or is it basically a case of using them at your own risk?',
      'Not asking for ways around enforcement. Just trying to understand the rules before making a bad decision.',
    ],
    comments: [
      c(
        'tos_reader',
        'The [official enforcement policy](https://www.wardogs.com/enforcement) explicitly prohibits cheats, including aimbots, ESP, triggerbots, and radar tools. It also lists temporary suspensions and permanent bans as possible penalties.',
        7,
      ),
      c('keysmashkid', 'So basically, the person selling the tool gets paid and the player has to deal with the consequences. Lovely business model lol.', 6),
      c('oakenshield', "I'd read the actual game policy rather than relying on a seller's FAQ. Those sources don't have the same incentive.", 5),
      c('mouseaccident', 'Also, "not detected yet" and "can\'t be detected" are very different statements.', 5),
      c('cautiousgoblin', "That's what I wanted to clarify. A promise from a vendor isn't permission from the game developer, and it doesn't remove the account risk.", 4),
      c('greyarea', 'Exactly. If keeping your account matters to you, staying within the game\'s rules is the straightforward choice.', 4),
    ],
  }),
  post({
    slug: 'what-to-check-before-buying-wardogs-cheats',
    category: 'Buying Advice',
    title: 'What should you check before buying a WARDOGS cheat?',
    excerpt:
      'A feature list alone doesn\'t tell you everything about a software purchase. Compare compatibility information, documented features, support terms, update policies, and account risks before making a decision.',
    author: 'cartbeforehorse',
    published: '2026-09-11',
    upvotes: 39,
    sourceTitle: "Wardogs Cheats Buyer's Guide: What to Check Before You Buy",
    sourcePath: '/blog/wardogs-cheats-buyers-guide/',
    body: [
      "I'm putting together a checklist for comparing WARDOGS cheat listings because the feature names alone don't tell me much.",
      'Obviously, the actual features matter, but what else would you check? Compatibility, support, updates, license duration, refund terms?',
      'I\'d also like to know how people separate useful documentation from marketing language. Saying a product is "premium" or "advanced" doesn\'t really explain what I\'m buying.',
    ],
    comments: [
      c('boringbutuseful', 'Compatibility first. The exact game, operating system, and supported version should be stated clearly.', 5),
      c('tea_and_packets', "I'd read the license duration and refund terms before looking at the feature list. Nobody likes discovering the boring part after paying.", 4),
      c('linuxisntmagic', 'Specific documentation is better than a wall of buzzwords. If the listing says something has controller support, for example, it should explain what that means rather than leaving you to guess.', 5),
      c('dropyourfps', "Support matters too. Is there a real way to ask a question? Are updates documented? Is there a clear status notice when compatibility hasn't been confirmed?", 6),
      c('mildpanic', 'And don\'t accept claims like "100% undetectable" as a meaningful guarantee. That\'s not something a seller can promise honestly.', 7),
      c(
        'cartbeforehorse',
        "Good checklist. I'd add account risk and the game's actual rules near the top instead of burying them at the bottom. Compare the [Wardogs cheat](/wardogs-cheats) product page and our [purchase FAQ](/faq/) before you pay.",
        3,
      ),
    ],
  }),
  post({
    slug: 'wardogs-cheats-controller-support-compatibility',
    category: 'Help & Support',
    title: 'Does controller support mean a WARDOGS cheat works properly with a controller?',
    excerpt:
      'Controller support can mean different things depending on the product. This discussion covers the compatibility questions a listing should answer rather than assuming that one claim guarantees everything works together.',
    author: 'stickdrift',
    published: '2026-09-20',
    upvotes: 33,
    sourceTitle: 'Contact support',
    sourcePath: '/support/',
    body: [
      'Quick question about controller support on WARDOGS cheat listings.',
      'If a product advertises controller support, does that automatically mean the overlay and every advertised feature will work with a gamepad?',
      "I'm guessing there's a difference between a game accepting controller input and a separate tool supporting that input properly, but some descriptions don't explain it.",
      'What details should a proper compatibility page include? See the [Wardogs cheat](/wardogs-cheats) feature list and [technical support](/support/) for documented answers.',
    ],
    comments: [
      c('deadzone_dan', "I'd assume nothing beyond what the listing actually documents. Controller support is a broad phrase.", 4),
      c('keyboardcrumbs', "Right. Gamepad support in WARDOGS doesn't automatically tell you anything about the compatibility of another piece of software.", 5),
      c('auntieping', 'Ask which input methods are supported, which features the statement applies to, and whether there are any limitations. Pretty basic information, really.', 4),
      c('stickdrift', 'Would you expect controller support to be listed separately from Windows compatibility?', 3),
      c('keyboardcrumbs', 'Definitely. Operating-system compatibility and input-device compatibility answer different questions.', 5),
      c('dadjokes.exe', 'The only universal controller feature is finding a way to blame stick drift after missing a shot.', 8),
    ],
  }),
  post({
    slug: 'wardogs-cheats-not-working-after-update',
    category: 'Help & Support',
    title: 'WARDOGS cheat software stopped loading after an update. What information should support need?',
    excerpt:
      'When software stops loading after an update, a useful support ticket should contain clear error details and version information. Don\'t assume the cause or disable security features to force software to run.',
    author: 'rebootrequired',
    published: '2026-09-28',
    upvotes: 36,
    sourceTitle: 'Wardogs Cheat Not Working? Common Problems and Fixes',
    sourcePath: '/blog/wardogs-cheat-not-working/',
    body: [
      'What information actually makes a support ticket useful when a third-party WARDOGS tool starts showing an error after a game update?',
      'A message that just says "broken" probably isn\'t going to help anyone diagnose anything.',
      'Would you include the exact error, Windows version, product version, and when the issue started? Anything else that should be included without sending random files or private information to support?',
    ],
    comments: [
      c('stderrfan', 'Exact error text and the time it occurred would be a good start. Screenshots can help if they don\'t expose personal information.', 5),
      c('cerealpacket', "Windows version and software version too. Otherwise support is guessing which setup you're talking about.", 4),
      c(
        'dontclickthat',
        "I'd check the product's published status before assuming it's something on your PC. An update might have changed compatibility. Start with the [troubleshooting FAQ](/blog/wardogs-cheat-not-working/) and [contact support](/support/).",
        5,
      ),
      c('rebootrequired', 'Would you send logs?', 3),
      c('dontclickthat', "Only through the product's documented support channel, and only the logs they specifically need. Don't run random files a stranger sends you just because they say it's a fix.", 7),
      c('cachemeoutside', "Also, don't turn off Windows security or interfere with the game's anti-cheat just to get a questionable tool to launch. If compatibility isn't confirmed, stop and check with support.", 6),
    ],
  }),
  post({
    slug: 'wardogs-esp-vs-aimbot-feature-comparison',
    category: 'Features & Questions',
    title: 'WARDOGS ESP or aimbot: how do these feature categories differ?',
    excerpt:
      'ESP and aimbot features are often listed together, but they describe different categories of functionality. Discuss the terminology and how to evaluate a product description without assuming every feature is included.',
    author: 'menuarchaeologist',
    published: '2026-10-05',
    upvotes: 40,
    sourceTitle: 'Wardogs ESP and Radar Explained',
    sourcePath: '/blog/wardogs-esp-radar-explained/',
    body: [
      "I'm trying to understand the difference between ESP and aimbot in WARDOGS software listings.",
      'My understanding is that ESP refers to displaying additional information, while an aimbot refers to automated aim assistance. So they\'re different functions, even when they\'re sold together.',
      'Is that broadly correct? And when comparing products, should you treat those as separate features rather than assume a product includes both?',
    ],
    comments: [
      c('syntaxmango', "Yes, that's the general distinction. Visual information versus automated aiming assistance.", 5),
      c('seatbeltfps', 'A list that says "ESP" doesn\'t automatically mean it includes every possible visual feature. Names, distance, health and other options may be described separately.', 4),
      c('marshmallowaim', 'Same applies to aim assistance. Different targeting options aren\'t automatically included just because the listing uses the word aimbot.', 4),
      c('uninstalled', "I'd also separate advertised functionality from compatibility. Even a detailed list doesn't prove a feature is currently supported by the latest game version.", 5),
      c(
        'menuarchaeologist',
        "Makes sense. The comparison should focus on exactly what's documented on the [Wardogs Cheats features](/wardogs-cheats) page and what limitations are stated, instead of treating the product name as the whole specification. See also [aimbot settings](/blog/wardogs-aimbot-settings/).",
        3,
      ),
      c('sectorseven', "And account consequences are still a separate issue. Different feature labels don't mean that a tool is allowed by the game's rules.", 4),
    ],
  }),
  post({
    slug: 'wardogs-hwid-spoofer-ban-questions',
    category: 'Safety & Account Questions',
    title: 'Does an HWID spoofer actually remove a WARDOGS ban?',
    excerpt:
      'An HWID spoofer is not the same thing as an account appeal. Discuss misleading ban-removal claims, official enforcement rules, and safer ways to address an account restriction.',
    author: 'actuallyreadtheterms',
    published: '2026-10-11',
    upvotes: 46,
    sourceTitle: 'Wardogs HWID Spoofer: What It Is and When It Matters',
    sourcePath: '/blog/wardogs-hwid-spoofer-guide/',
    body: [
      'Can someone explain what an HWID spoofer actually does in general?',
      "I've seen the term appear around gaming software, but I'm not clear on why people talk about it alongside game bans. Does changing a reported hardware identifier somehow remove the original account restriction, or are those two completely different things?",
      "I'm not looking for a ban bypass. I'd just like to separate actual account support from claims made by third-party sellers.",
    ],
    comments: [
      c('hexedkeyboard', "They're not the same thing. A hardware identifier and an account ban are different concepts, and changing one doesn't establish that the other restriction has been removed.", 6),
      c(
        'softreset',
        "Also, the [official WARDOGS enforcement policy](https://www.wardogs.com/enforcement) specifically prohibits spoofing what its anti-cheat reports. I wouldn't treat that as a harmless workaround.",
        5,
      ),
      c('actuallyreadtheterms', "That's the part I wanted to clarify. So claims that a spoofer automatically reverses an existing ban shouldn't be taken at face value.", 4),
      c('breadboard', 'Correct. If the restriction is a mistake, the proper route is the official appeal or support process, not a seller promising a shortcut.', 5),
      c('lagspike', "And before installing any program that claims to change system identifiers, think carefully about what access it's asking for. You're trusting a third party with your computer as well as your account.", 6),
      c('hexedkeyboard', "Exactly. Be skeptical of guarantees, especially when a product's marketing doesn't explain the limitations or the official rules.", 4),
    ],
  }),
  post({
    slug: 'wardogs-skin-changer-cosmetic-unlock-policy',
    category: 'Safety & Account Questions',
    title: 'Are skin changers and cosmetic unlockers allowed in WARDOGS?',
    excerpt:
      'Cosmetic tools may sound less serious than gameplay cheats, but modifying a game or unlocking restricted content can still violate the game\'s rules. Check the actual policy before installing anything.',
    author: 'paintbucketpanic',
    published: '2026-10-17',
    upvotes: 43,
    sourceTitle: 'Are Wardogs Cheats Safe? What to Know About Risk and Bans',
    sourcePath: '/blog/are-wardogs-cheats-safe/',
    body: [
      'Honest question: are skin changers treated differently from gameplay cheats in WARDOGS?',
      'I understand why a tool that affects aiming or shows hidden player information would be considered cheating. Cosmetics seem like a different category, but changing local files or unlocking things the game hasn\'t granted you could still violate the rules.',
      'I don\'t want to assume that "cosmetic only" means permitted. What\'s the actual distinction here?',
    ],
    comments: [
      c(
        'tos_reader',
        'The [official enforcement policy](https://www.wardogs.com/enforcement) warns against modified clients and services offering cosmetic unlocks. So I\'d read that before assuming a skin changer is allowed.',
        6,
      ),
      c('squarepantsfps', '"Doesn\'t change damage" and "allowed by the developer" aren\'t the same thing.', 5),
      c('lemonkeyboard', 'Exactly. Something can be purely visual from your perspective and still involve unauthorized modification or unlocking.', 4),
      c('paintbucketpanic', 'So the safest thing is to distinguish official customization options from third-party tools that modify or unlock game content?', 3),
      c('tos_reader', 'Yep. Use the game\'s supported customization features unless the developer explicitly authorizes something else.', 5),
      c('tinyhitbox', "I'd rather have fewer skins than lose access to the game over something cosmetic. That's an extremely bad trade lol.", 7),
    ],
  }),
  post({
    slug: 'wardogs-undetected-external-cheat-claims',
    category: 'Buying Advice',
    title: 'Does an "undetected" or "external" WARDOGS cheat claim guarantee safety?',
    excerpt:
      'Technical terms and marketing labels can sound reassuring, but they aren\'t proof of compatibility, authorization, or future detection outcomes. Discuss what those claims actually establish.',
    author: 'marketingdetector',
    published: '2026-10-21',
    upvotes: 51,
    sourceTitle: "Wardogs Cheats Buyer's Guide: What to Check Before You Buy",
    sourcePath: '/blog/wardogs-cheats-buyers-guide/',
    body: [
      'Can we talk about the words "external" and "undetected" in WARDOGS cheat descriptions?',
      "They sound reassuring, but I don't see why either word would automatically prove that a tool is safe to use. Something being described as external doesn't tell me whether the game allows it, and a status label doesn't guarantee what will happen after a future update.",
      'Am I missing a technical distinction here, or are people treating marketing language like a warranty?',
    ],
    comments: [
      c('kernelcorn', 'The distinction is that "external" describes a claimed technical approach. It doesn\'t establish that the game permits the tool or that the approach can\'t be detected.', 5),
      c('bytebandit', 'And "undetected" needs context. Undetected when? Tested against which version? By whom? For how long? Those are separate from a guarantee about the future.', 6),
      c('mildpanic', 'A green status label can tell you what a seller claims at that moment, assuming the status is genuine. It doesn\'t make a permanent safety guarantee possible.', 5),
      c('mousetrap99', 'The official rules are the bigger issue anyway. WARDOGS explicitly prohibits cheating tools. A particular implementation doesn\'t become authorized just because a seller describes it as external.', 6),
      c(
        'marketingdetector',
        "That's a much better way to think about it. Technical descriptions can be useful, but they shouldn't replace checking the [enforcement policy](https://www.wardogs.com/enforcement), the [Wardogs Cheats feature list](/wardogs-cheats), or our [account safety FAQ](/faq/).",
        4,
      ),
      c('cerealpacket', 'Ngl, "100% undetected forever" should make anyone more skeptical, not less. Software and enforcement systems change.', 7),
    ],
  }),
];
