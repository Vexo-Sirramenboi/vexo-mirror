var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};

function ownerHTML(s) {
  const t = s.tab || "overview";
  const count = { users: s.users ? s.users.length : "", emojis: (s.emojis || []).length, pics: (s.presets || []).length, ann: s.ann ? "Live" : "" };
  let body = "";
  if (t === "overview") body = `<div class="sub">Right now</div><div class="ostats" id="oStats">${ownStatsHTML(s.stats)}</div>`;
  else if (t === "users") body = `<div class="sub">Users</div><div class="opanel"><label class="osearch">${ic("search")}<input id="oQ" placeholder="Search users" value="${esc(s.q || "")}" spellcheck="false" autocomplete="off" aria-label="Search users"></label><div id="oUsers">${ownUsersHTML(s)}</div></div>`;
  else if (t === "ann") body = `<div class="sub">Announcement</div><div class="opanel">${s.ann ? `<div class="own-live">${annInner(s.ann, s.owners)}<button class="ghost" data-act="owntake">Take down</button></div>` : ""}
<textarea class="own-t" id="annT" maxlength="160" placeholder="Say something to everyone" aria-label="Announcement"></textarea>
<div class="own-row"><span>Also show on the home page</span><button class="tog" role="switch" aria-checked="${s.ann ? !!s.ann.home : true}" data-act="ownhome" aria-label="Also show on the home page"><i></i></button></div>
<div class="own-go"><button class="pill pri" data-act="ownpost">Post</button></div></div>`;
  else if (t === "emojis") body = `<div class="sub">Custom emojis</div><div class="own-em">${(s.emojis || []).map((e) => `<div class="own-emt"><img src="${esc(e.url)}" alt="" draggable="false"><code>:${esc(e.name)}:</code><button type="button" class="own-del" data-act="ownemdel" data-n="${esc(e.name)}" aria-label="Delete :${esc(e.name)}:">${ic("trash")}</button></div>`).join("")}<button type="button" class="own-add" data-act="ownem">${ic("plus")}Add emoji</button></div>`;
  else if (t === "pics") body = `<div class="sub">Preset pictures</div><div class="own-pr">${(s.presets || []).map((p) => `<div class="own-prt"><img src="${esc(p.url)}" alt="" draggable="false"><button type="button" class="own-del" data-act="ownprdel" data-f="${esc(p.id)}" aria-label="Delete picture">${ic("trash")}</button></div>`).join("")}<button type="button" class="own-add round" data-act="ownpr" aria-label="Add picture">${ic("plus")}</button></div>`;
  else body = `<div class="sub">Settings</div><div class="oset"><div class="opanel own-row"><span class="otxt"><b>Pictures &amp; GIFs</b><small>${s.pics ? "Everyone can send" : "Owners only"}</small></span><button class="tog" role="switch" aria-checked="${!!s.pics}" data-act="ownpics" aria-label="Pictures and GIFs"><i></i></button></div>
<div class="opanel own-row"><span class="olg t">tt</span><span class="otxt"><b>tungtung chat</b><small>${s.tt ? "On for everyone" : "Off for everyone"}</small></span><button class="tog" role="switch" aria-checked="${!!s.tt}" data-act="owntt" aria-label="tungtung chat"><i></i></button></div>
<div class="opanel own-row"><span class="otxt"><b>Sign-ups</b><small>New accounts</small></span><div class="seg">${[["1", "Open"], ["0", "Closed"]].map(([v, l]) => `<button type="button" data-act="ownsu" data-su="${v}" class="${(s.signups ? "1" : "0") === v ? "on" : ""}">${l}</button>`).join("")}</div></div></div>`;
  return `<div class="ph"><span class="av own">${ic("crown")}</span><span class="meta"><b>Owner</b></span></div>
<div class="onav"><nav class="onav-l" aria-label="Owner sections">${OTABS.map(([k, l]) => `<button type="button" class="${t === k ? "on" : ""}" data-act="owntab" data-t="${k}"${t === k ? ' aria-current="page"' : ""}>${l}${count[k] !== void 0 && count[k] !== "" ? `<em>${count[k]}</em>` : ""}</button>`).join("")}</nav><div class="fr onav-r"><div class="onav-in">${body}</div></div></div>`;
}
function ownStatsHTML(d) {
  if (!d) return ["Online now", "Messages today", "Total messages", "Photos & GIFs today", "Total photos & GIFs"].map((l) => `<div class="ost"><small>${esc(l)}</small><b>–</b></div>`).join("");
  const top = Math.max(1, ...d.hours), n = (x) => (+x || 0).toLocaleString();
  return `<div class="ost"><small>Online now</small><b>${n(d.online)}</b><em>of ${n(d.accounts)} accounts · ${n(d.newWeek)} new this week</em></div>
<div class="ost"><small>Messages today</small><b>${n(d.msgsToday)}</b><div class="ospark" aria-hidden="true">${d.hours.map((x) => `<i style="height:${Math.max(6, Math.round(x / top * 100))}%"></i>`).join("")}</div></div>
<div class="ost"><small>Total messages</small><b>${n(d.msgsTotal)}</b><em>all time</em></div>
<div class="ost"><small>Photos &amp; GIFs today</small><b>${n(d.photosToday + d.gifsToday)}</b><em>${n(d.photosToday)} photos · ${n(d.gifsToday)} GIFs</em></div>
<div class="ost"><small>Total photos &amp; GIFs</small><b>${n(d.photosTotal + d.gifsTotal)}</b><em>${n(d.photosTotal)} photos · ${n(d.gifsTotal)} GIFs</em></div>`;
}
function ownUsersHTML(s) {
  const all = s.users || null;
  if (!all) return `<div class="onone">Loading…</div>`;
  const q = String(s.q || "").trim().toLowerCase(), f = s.f || "all", wk = Date.now() - 7 * 864e5;
  const counts = { all: all.length, online: all.filter((u) => u.online).length, new: all.filter((u) => u.joined > wk).length };
  const list2 = all.filter((u) => (f === "online" ? u.online : f === "new" ? u.joined > wk : true) && (!q || u.name.includes(q)));
  const shown = list2.slice(0, s.n || 30);
  return `<div class="ochips">${[["all", "All"], ["online", "Online"], ["new", "New this week"]].map(([k, l]) => `<button type="button" class="${f === k ? "on" : ""}" data-act="ownf" data-f="${k}">${l} · ${counts[k]}</button>`).join("")}</div>
${shown.length ? shown.map((u) => `<div class="ourow" data-ouser="${esc(u.name)}">${av(u.name, { online: u.online, color: u.color, pfp: u.pfp })}<span class="ou-n">${uname(u.name, s.owners)}</span><span class="ou-j">${mon(u.joined, 1)}</span><span class="ou-s${u.online ? " on" : ""}">${u.online ? "Online" : u.seen ? rel(u.seen) : "Never"}</span><button type="button" class="ghost" data-act="ownview" data-n="${esc(u.name)}">View</button></div>`).join("") : `<div class="onone">No users</div>`}
${list2.length > shown.length ? `<button type="button" class="omore" data-act="ownmore">Show ${list2.length - shown.length} more</button>` : ""}`;
}
function av(name, o = {}) {
  const img = o.img || o.pfp;
  const pp = !img && PFP[String(name).toLowerCase()];
  const pr = o.prof ? ` data-prof="${esc(name)}"` : "";
  if (pp) return `<span class="av pic"${pr}><canvas class="${pp}" width="72" height="72"></canvas>${o.online ? '<i class="on-dot"></i>' : ""}</span>`;
  const ch = esc((String(name)[0] || "?").toUpperCase());
  const inner = img ? `<img src="${esc(img)}" alt="" loading="lazy" draggable="false" data-i="${ch}" onerror="this.parentNode.classList.remove('pic');this.replaceWith(this.dataset.i)">` : ch;
  return `<span class="av${img ? " pic" : ""}"${pr} style="--g:${grad(name, o.color)}">${inner}${o.online ? '<i class="on-dot"></i>' : ""}</span>`;
}
function dayLabel(t) {
  const d = new Date(t), n = new Date();
  if (d.toDateString() === n.toDateString()) return "Today";
  const y = new Date(n);
  y.setDate(n.getDate() - 1);
  if (d.toDateString() === y.toDateString()) return "Yesterday";
  return d.toLocaleDateString(void 0, { weekday: "long", month: "short", day: "numeric" });
}
function rel(t) {
  const s = (Date.now() - t) / 1e3;
  if (s < 45) return "just now";
  if (s < 3600) return Math.max(1, Math.floor(s / 60)) + "m ago";
  if (new Date(t).toDateString() === (new Date()).toDateString()) return Math.floor(s / 3600) + "h ago";
  return clock(t);
}
function ago(t) {
  const s = (Date.now() - t) / 1e3;
  if (s < 60) return "just now";
  if (s < 3600) return Math.floor(s / 60) + " min ago";
  if (s < 86400) return Math.floor(s / 3600) + "h ago";
  return dayLabel(t);
}
function cd(exp) {
  const s = Math.max(0, Math.round((exp - Date.now()) / 1e3));
  return s ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}` : "Expired";
}
function authHTML(up) {
  return `${duoLeft()}
<form class="d-card${up ? "" : " d-signin"}" id="authForm" autocomplete="off"><i class="beam" aria-hidden="true"></i>${bow("cbow")}<div class="d-tabs"><button type="button" data-act="mode" data-m="in"${up ? "" : ' class="on"'}>Sign in</button><button type="button" data-act="mode" data-m="up"${up ? ' class="on"' : ""}>Create account</button></div>
<div class="d-step d-mail"${up ? "" : " hidden"} aria-hidden="true"><i class="on"></i><i></i><i></i><b>1 OF 3</b></div>
<label class="d-f2 d-user"${up ? " hidden" : ""}><span class="at">@</span><input id="authName" placeholder="username" maxlength="12" spellcheck="false" autocapitalize="off" autocomplete="username" aria-label="Username"></label>
<label class="d-f2 d-mail"${up ? "" : " hidden"}>${ic("mail")}<input id="authMailUp" type="email" placeholder="email" maxlength="254" autocomplete="email" aria-label="Email"></label>
<label class="d-f2">${ic("lock")}<input id="authPass" type="password" placeholder="${up ? "make a password" : "password"}" maxlength="200" autocomplete="${up ? "new-password" : "current-password"}" aria-label="Password"><button type="button" class="eye" data-act="eye" aria-label="Show password">${ic("eye")}</button></label>
<div class="d-meter d-mail" id="dmeter"${up ? "" : " hidden"}><i></i><i></i><i></i><i></i></div>
<div class="ferr" id="authErr" hidden></div><button class="go">${up ? "Send code" : "Sign in"}</button><div class="d-alt"${up ? " hidden" : ""}><button type="button" data-act="mailmode" data-m="reset">Forgot password?</button><button type="button" data-act="mailmode" data-m="login">Email me a code</button></div></form></div>`;
}
function mailAuthHTML(m) {
  const reset = m.mode === "reset", signup = m.mode === "signup";
  const head = signup ? m.step === "name" ? "Pick a username" : "Check your inbox" : reset ? "Reset your password" : "Sign in with a code";
  const body = m.step === "name" ? `<p class="d-note">This is how friends find you. 4–12 letters, numbers or underscores.</p>
<label class="d-f2${m.free === false ? " bad" : m.free ? " ok" : ""}"><span class="at">@</span><input id="authPick" maxlength="12" placeholder="username" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Username" value="${esc(m.name || "")}">${m.free === false ? ic("x") : m.free ? ic("seen") : ""}</label>
<p class="d-hint${m.free === false ? " bad" : ""}">${esc(m.why || (m.free ? (m.name || "") + " is free." : ""))}</p>` : m.step === "code" ? `<p class="d-note">${signup ? `We sent a code to <b>${esc(m.shown || m.email)}</b>.` : `If an account uses ${esc(m.email)}, a code is on its way.`}</p>
<label class="d-f2">${ic("lock")}<input id="authCode" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="••••••" aria-label="Code"></label>
${reset ? `<label class="d-f2">${ic("lock")}<input id="authNew" type="password" placeholder="new password" maxlength="200" autocomplete="new-password" aria-label="New password"><button type="button" class="eye" data-act="eye" aria-label="Show password">${ic("eye")}</button></label>` : ""}` : `<label class="d-f2">${ic("mail")}<input id="authMail" type="email" maxlength="254" placeholder="you@example.com" autocomplete="email" aria-label="Email"></label>`;
  return `${duoLeft()}
<form class="d-card d-mid" id="mailAuth" autocomplete="off"><i class="beam" aria-hidden="true"></i>${bow("cbow")}
${signup ? `<div class="d-step" aria-hidden="true"><i class="on"></i><i class="on"></i><i class="${m.step === "name" ? "on" : ""}"></i><b>${m.step === "name" ? "3" : "2"} OF 3</b></div>` : ""}
<h2 class="d-head">${head}</h2>
${body}
<div class="ferr" id="authErr"${m.err ? "" : " hidden"}>${esc(m.err || "")}</div>
<button class="go"${m.step === "name" && m.free === false ? " disabled" : ""}>${m.step === "name" ? "Create my account" : m.step === "code" ? signup ? "Confirm email" : reset ? "Set password" : "Sign in" : "Send code"}</button>
${m.step === "name" ? `<p class="d-foot">Signed up as ${esc(m.shown || m.email)}</p>` : `<div class="d-alt">${m.step === "code" ? `<button type="button" data-act="mailsend">Send another code</button>` : ""}<button type="button" data-act="mailmode" data-m="">${signup ? "Use a different email" : "Back to sign in"}</button></div>`}</form></div>`;
}
function navHTML(s) {
  const it = (v, avh, name, sub2, badge) => `<button class="it${s.view === v ? " on" : ""}" data-v="${esc(v)}" title="${esc(name)}">${avh}<span class="meta"><b>${uname(name, s.owners)}</b>${sub2}</span>${badge ? `<span class="badge">${badge > 99 ? "99+" : badge}</span>` : ""}</button>`;
  const n = s.incoming.length;
  let h2 = `<div class="cn-l"><div class="ttop"><div class="sign">chat</div><span class="tico"><button type="button" class="tbell${s.view === "friends" ? " on" : ""}" data-v="friends" aria-label="Add friends">${ic("add")}${n ? `<i>${n > 9 ? "9+" : n}</i>` : ""}</button>${s.isOwner ? `<button type="button" class="tbell${s.view === "owner" ? " on" : ""}" data-v="owner" aria-label="Owner dashboard">${ic("crown")}</button>` : ""}</span></div>`;
  if (s.friends.length) h2 += `<div class="cn-sec">Messages</div>`;
  for (const f of s.friends) {
    const sub2 = s.typing.has(f.name) ? '<small class="ty">typing…</small>' : f.last ? `<small>${f.last.mine ? "You: " : ""}${lastText(f.last)}</small>` : "<small>Say hi</small>";
    h2 += it("dm:" + f.name, av(f.name, { online: f.online, color: f.color, pfp: f.pfp, prof: true }), f.name, sub2, f.unread);
  }
  h2 += `</div><div class="acct">${s.ttOn ? `<button class="other" data-cmode="tt" aria-label="Switch to tungtung chat"><span class="olg t">tt</span><span>tungtung${s.ttUnread ? " · " + (s.ttUnread > 99 ? "99+" : s.ttUnread) + " unread" : ""}</span>${ic("swap")}</button>` : ""}<button class="me${s.view === "account" ? " on" : ""}" data-v="account" aria-label="Your account">${av(s.me, { online: true, color: s.mine && s.mine.color, pfp: s.mine && s.mine.pfp })}<span class="meta"><b>${uname(s.me, s.owners)}</b><small>on vella</small></span>${ic("chev")}</button></div>`;
  return h2;
}
function rx(id, r, me, face2) {
  const e = Object.entries(r || {}).filter(([, u]) => Array.isArray(u) && u.length);
  if (!e.length) return "";
  const show = (k) => {
    const x = /^:([a-z0-9_]{2,24}):$/i.exec(k), src = x && face2 ? face2(x[1].toLowerCase()) : null;
    return src ? `<img class="ce" src="${esc(src)}" alt="${esc(k)}" draggable="false">` : esc(k);
  };
  return `<div class="rx">${e.map(([k, us]) => `<button class="chip${us.includes(me) ? " on" : ""}" data-act="react" data-id="${esc(id)}" data-e="${esc(k)}">${show(k)}<b>${us.length}</b></button>`).join("")}</div>`;
}
function mediaHTML(m) {
  const gif = m.kind !== "photo", label = gif ? "GIF" : "Photo";
  if (!m.media) return `<div class="gone">${ic("imgoff")}${label} expired</div>`;
  const ar = m.w && m.h ? ` style="aspect-ratio:${+m.w}/${+m.h}"` : "";
  return `<button type="button" class="dpic" data-act="view" data-id="${esc(m.id)}" aria-label="Open ${label.toLowerCase()}"${ar}><img src="${esc(m.media)}" alt="" draggable="false" loading="lazy" onerror="this.parentNode.classList.add('x')">${gif ? '<span class="gtag">GIF</span>' : ""}${!gif && m.exp ? `<span class="tmr">${ic("clock")}<i data-exp="${+m.exp}">${left(m.exp)}</i></span>` : ""}</button>`;
}
function dmRowsHTML(msgs, o) {
  let h2 = o.more ? `<button class="ghost more" data-act="older">Load earlier</button>` : "", lastDay = "";
  const last = msgs[msgs.length - 1];
  msgs.forEach((m, i) => {
    const d = dayLabel(m.time);
    if (d !== lastDay) {
      h2 += `<div class="day">${esc(d)}</div>`;
      lastDay = d;
    }
    const p = msgs[i - 1], nx = msgs[i + 1];
    const mine = m.from === o.me;
    const grp = p && p.from === m.from && !m.reply && m.time - p.time < 3e5 && dayLabel(p.time) === d;
    const endGrp = !nx || nx.from !== m.from || nx.reply || nx.time - m.time >= 3e5;
    if (m.kind === "unsent") {
      h2 += `<div class="b-row${mine ? " mine" : ""}${grp ? " grp" : ""}"><div class="uns">${mine ? "You" : esc(m.from)} unsent a message</div></div>`;
      return;
    }
    h2 += `<div class="b-row${mine ? " mine" : ""}${grp ? " grp" : ""}${m.pend ? " pend" : ""}">${endGrp ? face(m.from, mine, o) : `<span class="bav"></span>`}<div class="b-in">`;
    if (m.reply) h2 += `<div class="q">${ic("reply")}<span>${esc(m.reply.from === o.me ? "You" : m.reply.from || "")}: ${esc(kindText(m.reply))}</span></div>`;
    h2 += (!m.kind || m.kind === "text" ? `<div class="bub${jumbo(m.text, o.emojis) ? " jumbo" : ""}">${dmText(m.text, o.emojis)}</div>` : mediaHTML(m) + (m.text ? `<div class="bub cap">${dmText(m.text, o.emojis)}</div>` : "")) + rx(m.id, m.r, o.me, (n) => o.emojis && o.emojis.get(n) || null);
    if (endGrp) h2 += mine && m === last && !m.pend && o.read >= m.id ? `<div class="tm">${ic("seen")}Seen · ${tt(m.time)}</div>` : `<div class="tm">${tt(m.time)}</div>`;
    h2 += `</div>`;
    if (!m.pend) h2 += acts(m.id, mine);
    h2 += `</div>`;
  });
  if (o.typing) h2 += `<div class="b-row">${face(o.peer, false, o)}<div class="b-in"><div class="bub typing"><i></i><i></i><i></i></div></div></div>`;
  if (!msgs.length && !o.typing) h2 += `<div class="empty"><div class="sign">hi</div>Say hi to ${esc(o.peer)}</div>`;
  return h2;
}
var esc, ic, QUICK, uname, annInner, annHTML, OTABS, EMOJI, AV, hash, COLORS, grad, PFP, clock, tt, bow, duoLeft, dmHeadHTML, composerHTML, draftHTML, pickerHTML, gifGridHTML, acpHTML, left, leftLong, viewerHTML, cropHTML, replyBarHTML, acts, kindText, lastText, EMO, dmText, jumbo, face, friendsHTML, ticketHTML, incomingHTML, outgoingHTML, pb, picGrid, mon, draftPfp, accountHTML, mailBox, delBox, cardHTML;
var init_chat_view = __esm({
  "public/js/chat-view.js"() {
    esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
    ic = (id) => `<svg class="ic"><use href="#i-${id}"/></svg>`;
    QUICK = ["💖", "✨", "😭", "😂"];
    uname = (n, owners) => n && owners && owners.includes(n) ? `<span class="oname">${esc(n)}</span><svg class="crown" role="img" aria-label="owner"><use href="#i-crown"/></svg>` : esc(n);
    annInner = (a, owners) => `${ic("mega")}<span><b>${uname(a.by || "vella", owners)}</b> ${esc(a.text)}</span>`;
    annHTML = (a, owners) => `<div class="annb" role="status">${annInner(a, owners)}<button class="ib" data-act="annx" aria-label="Hide announcement">${ic("x")}</button></div>`;
    OTABS = [["overview", "Overview"], ["users", "Users"], ["ann", "Announcement"], ["emojis", "Emojis"], ["pics", "Pictures"], ["settings", "Settings"]];
    EMOJI = ["💖", "✨", "😭", "😂", "🫶", "🥺", "💅", "🌸", "🦋", "🎀", "💜", "⭐", "🔥", "👀", "😴", "🍓"];
    AV = [["#ff7ad9", "#b44dff"], ["#ffb86b", "#ff5f9e"], ["#6be4ff", "#8b6bff"], ["#7ef0c1", "#2f9e87"], ["#ffd84d", "#ff8a4d"], ["#c98bff", "#6b7bff"], ["#ff9ad9", "#ff5f7e"], ["#8fd3ff", "#5f7bff"]];
    hash = (s) => [...String(s)].reduce((a, c) => a * 31 + c.charCodeAt(0) >>> 0, 7);
    COLORS = [["#ff7ad9", "#a63dff"], ["#ffb86b", "#ff6b9a"], ["#7ef0c1", "#2f9e87"], ["#7aa8ff", "#b77dff"], ["#ffe07a", "#ff9f5a"], ["#9aa0b4", "#4b4f63"]];
    grad = (name, c) => {
      const g = COLORS[c] || AV[hash(String(name).toLowerCase()) % AV.length];
      return `linear-gradient(135deg,${g[0]},${g[1]})`;
    };
    PFP = { _vella_: "vpic", tungy: "gpic" };
    clock = (t) => {
      const d = new Date(t);
      return `${d.getHours() % 12 || 12}:${String(d.getMinutes()).padStart(2, "0")}`;
    };
    tt = (t) => `<time data-t="${+t}" title="${clock(t)}">${rel(t)}</time>`;
    bow = (c) => `<svg class="${c}" aria-hidden="true"><use href="#bow"/></svg>`;
    duoLeft = () => `<div class="duo"><div class="d-left">${bow("dbow")}<h1 class="sign">chat</h1>
<div class="d-bub" aria-hidden="true"><div class="d-who d-f"><span class="av pic"><canvas class="vpic" width="72" height="72"></canvas></span>vella</div><div class="d-b d-f">put days never finished</div><div class="d-b mine d-f">master got me workin</div><div class="d-seen">Seen</div><span class="chip d-f">💖<b>2</b></span><div class="d-b typing d-f"><i></i><i></i><i></i></div></div>
<div class="d-tease"><div class="cells lit">${["K", "W", "9", "H"].map((c) => `<span class="cell">${c}</span>`).join("")}</div><div><b>Friends need your code</b>No strangers in your DMs</div></div></div>`;
    dmHeadHTML = (f, typing, owner) => `<div class="ph">${av(f.name, { online: f.online, color: f.color, pfp: f.pfp, prof: true })}<span class="meta"><b>${uname(f.name, owner)}</b><small id="dmSt"${typing ? ' class="ty"' : ""}>${typing ? "typing…" : f.online ? "online" : "offline"}</small></span></div>`;
    composerHTML = (ph, lim, pics) => `<form class="comp" id="comp" autocomplete="off"><div class="cerr" id="cerr" hidden></div><div class="rbar" id="rbar" hidden></div>
<div class="dbar" id="dbar" hidden></div>
<div class="cbox">${pics ? `<button type="button" class="ib" data-act="pickimg" aria-label="Send a photo">${ic("img")}</button><button type="button" class="ib gifb" data-act="gifs" aria-label="GIFs"><b>GIF</b></button><input type="file" id="pick" accept="image/png,image/jpeg,image/webp,image/gif" hidden>` : ""}<button type="button" class="ib" data-act="emo" aria-label="Emoji">${ic("smile")}</button><input id="msg" placeholder="${esc(ph)}" maxlength="${lim}" autocomplete="off" aria-label="Message"><button class="send" id="send" aria-label="Send" disabled>${ic("send")}</button></div>
<div class="emop pk" id="emop" hidden></div><div class="acp" id="acp" role="listbox" aria-label="Emoji suggestions" hidden></div></form>`;
    draftHTML = (d) => !d ? "" : `<div class="dft${d.err ? " bad" : ""}"><img src="${esc(d.url)}" alt="" draggable="false">${d.up < 100 ? `<div class="dup"><i style="width:${Math.round(d.up)}%"></i></div>` : ""}<span>${d.err ? esc(d.err) : d.up < 100 ? "Uploading… " + Math.round(d.up) + "%" : d.kind === "photo" ? "Photo ready" : "GIF ready"}</span><button type="button" class="ib" data-act="dx" aria-label="Remove">${ic("x")}</button></div>`;
    pickerHTML = (s) => `<div class="pk-tabs" role="tablist"><button type="button" role="tab" aria-selected="${s.tab === "e"}" class="${s.tab === "e" ? "on" : ""}" data-act="ptab" data-t="e">Emoji</button><button type="button" role="tab" aria-selected="${s.tab === "g"}" class="${s.tab === "g" ? "on" : ""}" data-act="ptab" data-t="g">GIFs</button></div>
<div class="pk-b">${s.tab === "e" ? (s.emojis.length ? `<div class="pk-h">vella</div><div class="pk-g">${s.emojis.map((e) => `<button type="button" data-act="ins" data-e=":${esc(e.name)}:" title=":${esc(e.name)}:" aria-label=":${esc(e.name)}:"><img src="${esc(e.url)}" alt="" draggable="false"></button>`).join("")}</div><div class="pk-h">Everyone</div>` : "") + `<div class="pk-g">${EMOJI.map((e) => `<button type="button" data-act="ins" data-e="${e}">${e}</button>`).join("")}</div>` : `${s.gifSearch ? `<label class="pk-s">${ic("search")}<input id="gifQ" placeholder="Search GIFs" maxlength="50" value="${esc(s.q)}" autocomplete="off" aria-label="Search GIFs"></label><div id="gifG">${gifGridHTML(s)}</div>` : ""}<button type="button" class="pk-up" data-act="gifup">${ic("upload")}Upload a GIF</button>${s.gifSearch ? `<div class="pk-by">Powered by GIPHY</div>` : ""}`}</div>`;
    gifGridHTML = (s) => s.loading && !s.gifs ? `<div class="pk-none">Loading…</div>` : s.gifs && !s.gifs.length ? `<div class="pk-none">No GIFs found</div>` : `<div class="pk-gif">${(s.gifs || []).map((g, i) => `<button type="button" data-act="gifsend" data-i="${i}" aria-label="Send GIF"><img src="${esc(g.thumb)}" alt="" loading="lazy" draggable="false"></button>`).join("")}</div>`;
    acpHTML = (list2, k) => list2.map((e, i) => `<button type="button" role="option" aria-selected="${i === k}" class="${i === k ? "on" : ""}" data-act="acp" data-n="${i}"><img src="${esc(e.url)}" alt="" draggable="false"><span>:${esc(e.name)}:</span></button>`).join("");
    left = (exp) => {
      const s = Math.max(0, Math.ceil((exp - Date.now()) / 1e3));
      return s >= 3600 ? Math.ceil(s / 3600) + "h" : s >= 60 ? Math.ceil(s / 60) + "m" : s + "s";
    };
    leftLong = (exp) => {
      const s = Math.max(0, Math.ceil((exp - Date.now()) / 1e3));
      return s >= 3600 ? Math.floor(s / 3600) + "h " + Math.floor(s % 3600 / 60) + "m" : Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
    };
    viewerHTML = (m, s) => `<div class="viewer" id="viewer" role="dialog" aria-label="${m.kind === "photo" ? "Photo" : "GIF"}"><div class="vtop">${av(m.from, { color: s.color, pfp: s.pfp })}<span class="meta"><b>${uname(m.from, s.owners)}</b><small>${esc(clock(m.time))}</small></span>${m.exp && m.kind === "photo" ? `<span class="vpill">${ic("clock")}Deletes in <i data-expl="${+m.exp}">${leftLong(m.exp)}</i></span>` : ""}<button type="button" class="ib" data-act="vclose" aria-label="Close">${ic("x")}</button></div><div class="vimg" data-act="vclose"><img src="${esc(m.media)}" alt="" draggable="false"></div><div class="vbot">${QUICK.map((e) => `<button type="button" data-act="react" data-id="${esc(m.id)}" data-e="${e}" aria-label="React ${e}">${e}</button>`).join("")}</div></div>`;
    cropHTML = (o) => `<div class="vdlg" id="crop" role="dialog" aria-label="${esc(o.title)}"><div class="vdlg-in"><h3>${esc(o.title)}</h3><div class="crop"><canvas id="cropC" width="512" height="512"></canvas></div>${o.gif ? "" : `<label class="zoom">${ic("zoomout")}<input type="range" id="cropZ" min="1" max="4" step="0.01" value="1" aria-label="Zoom">${ic("zoomin")}</label>`}${o.name ? `<label class="namef">:<input id="cropN" maxlength="24" placeholder="name" autocomplete="off" spellcheck="false" aria-label="Emoji name">:</label>` : ""}<div class="ferr" id="cropErr" hidden></div><div class="vdlg-b"><button type="button" class="ghost" data-act="cropx">Cancel</button><button type="button" class="pc-go" data-act="cropok">${esc(o.ok)}</button></div></div></div>`;
    replyBarHTML = (who, text) => `${ic("reply")}<span>Replying to <b>${esc(who)}</b> · ${esc(text)}</span><button type="button" data-act="unreply" aria-label="Cancel reply">${ic("x")}</button>`;
    acts = (id, un) => `<div class="acts"><button data-act="reply" data-id="${esc(id)}" aria-label="Reply">${ic("reply")}</button>${QUICK.map((e) => `<button data-act="react" data-id="${esc(id)}" data-e="${e}" aria-label="React ${e}">${e}</button>`).join("")}${un ? `<button data-act="unsend" data-id="${esc(id)}" aria-label="Unsend" title="Unsend">${ic("undo")}</button>` : ""}</div>`;
    kindText = (m) => m.text && m.kind && m.kind !== "text" && m.kind !== "unsent" ? (m.kind === "photo" ? "Photo · " : "GIF · ") + m.text : m.kind === "photo" ? "Photo" : m.kind === "gif" || m.kind === "giphy" ? "GIF" : m.kind === "unsent" ? "Message unsent" : m.text ?? "message";
    lastText = (l) => l.kind && l.kind !== "text" ? kindText(l) : esc(l.text);
    EMO = /:([a-z0-9_]{2,24}):/gi;
    dmText = (text, emojis) => esc(text).replace(EMO, (m, n) => {
      const u = emojis && emojis.get(n.toLowerCase());
      return u ? `<img class="cem" src="${esc(u)}" alt=":${n}:" title=":${n}:" draggable="false">` : m;
    });
    jumbo = (text, emojis) => !!emojis && /^(\s*:[a-z0-9_]{2,24}:\s*){1,3}$/i.test(text) && [...text.matchAll(EMO)].every((x) => emojis.has(x[1].toLowerCase()));
    face = (name, mine, o) => {
      const w = (mine ? o.mine : o.you) || {};
      return av(name, { color: w.color, pfp: w.pfp });
    };
    friendsHTML = () => `<div class="ph"><span class="av add">${ic("add")}</span><span class="meta"><b>Add friends</b><small>Friends can message each other</small></span></div>
<div class="fr"><div class="fr-in"><section><div class="sub">Add a friend</div><form class="addf" id="addForm" autocomplete="off"><input class="inp" id="addName" placeholder="Username" maxlength="13" spellcheck="false" autocapitalize="off" aria-label="Username"><button class="pill pri">Send request</button></form><div class="ferr" id="addErr" hidden></div><div id="frTicket"></div></section>
<section><div class="sub">Requests for you</div><div id="frIn"></div></section><section><div class="sub">Waiting on them</div><div id="frOut"></div></section></div></div>`;
    ticketHTML = (rv) => !rv ? "" : `<div class="ticket"><div class="t-top">${av(rv.to, { color: rv.color, pfp: rv.pfp })}<span>Code for <b>${esc(rv.to)}</b></span><span class="cd" data-exp="${rv.exp}">${cd(rv.exp)}</span></div><div class="cells lit">${[...rv.code].map((c) => `<span class="cell">${esc(c)}</span>`).join("")}</div><p>Tell ${esc(rv.to)} this code in person. They type it in to accept.</p></div>`;
    incomingHTML = (list2, owner) => !list2.length ? `<div class="none">No requests right now</div>` : list2.map((r) => `<div class="req" data-from="${esc(r.from)}"><div class="req-h">${av(r.from, { color: r.color, pfp: r.pfp })}<span><b>${uname(r.from, owner)}</b> wants to be friends</span><time>${esc(ago(r.time))}</time></div>
<div class="req-b"><div class="cells in">${[0, 1, 2, 3].map((i) => `<input class="cell" id="c-${esc(r.from)}-${i}" maxlength="1" autocapitalize="characters" autocomplete="off" aria-label="Code letter ${i + 1}">`).join("")}</div>
<button class="pill pri" data-act="accept" data-from="${esc(r.from)}">Accept</button><button class="pill" data-act="decline" data-from="${esc(r.from)}">Decline</button></div><div class="ferr" hidden></div></div>`).join("");
    outgoingHTML = (list2, owner) => !list2.length ? `<div class="none">Nothing pending</div>` : list2.map((s) => `<div class="snt">${av(s.to, { color: s.color, pfp: s.pfp })}<b>${uname(s.to, owner)}</b><span class="mono">${esc(s.code)}</span><span class="cd" data-exp="${s.exp}">${cd(s.exp)}</span><button class="ghost" data-act="${s.exp < Date.now() ? "resend" : "cancel"}" data-to="${esc(s.to)}">${s.exp < Date.now() ? "Send again" : "Cancel"}</button></div>`).join("");
    pb = (id, url, cur2) => `<button type="button" role="radio" aria-checked="${cur2 === id}" class="${cur2 === id ? "on" : ""}" data-act="pcpic" data-f="${esc(id)}" aria-label="Picture"><img src="${esc(url)}" alt="" draggable="false"></button>`;
    picGrid = (s) => {
      const own = s.isOwner && s.mine.pfpId && !(s.presets || []).some((p) => p.id === s.mine.pfpId);
      return (s.isOwner ? `<button type="button" class="up" data-act="pcup" aria-label="Upload photo">${ic("upload")}</button>` : "") + (own ? pb(s.mine.pfpId, s.mine.pfp, s.pfp) : "") + (s.presets || []).map((p) => pb(p.id, p.url, s.pfp)).join("") + `<button type="button" role="radio" aria-checked="${!s.pfp}" class="${!s.pfp ? "on" : ""}" data-act="pcpic" data-f="" style="--g:${grad(s.name, s.color)}" aria-label="No picture">${esc((String(s.name)[0] || "?").toUpperCase())}</button>`;
    };
    mon = (t, day) => new Date(t).toLocaleDateString("en-US", day ? { month: "short", day: "numeric" } : { month: "short", year: "numeric" });
    draftPfp = (s) => !s.pfp ? null : ((s.presets || []).find((x) => x.id === s.pfp) || {}).url || (s.pfp === s.mine.pfpId ? s.mine.pfp : null);
    accountHTML = (s) => `<div class="ph">${av(s.name, { online: true, color: s.color, pfp: draftPfp(s) })}<span class="meta"><b>${uname(s.name, s.owners)}</b><small>${s.mine.joined ? "Joined " + mon(s.mine.joined) : "on vella"}</small></span></div>
<div class="fr"><div class="onav-in acc">
<div class="sub">Picture</div>
<div class="opanel"><div class="pc-pg" role="radiogroup" aria-label="Picture">${picGrid(s)}</div></div>
<div class="sub">Profile</div>
<div class="opanel"><textarea id="pcBio" maxlength="80" placeholder="Bio" aria-label="Bio">${esc(s.mine.bio)}</textarea><div class="pc-lab">Colour</div><div class="pc-sw" role="radiogroup" aria-label="Colour">${COLORS.map((g, i) => `<button type="button" role="radio" aria-checked="${s.color === i}" class="${s.color === i ? "on" : ""}" data-act="pccolor" data-c="${i}" style="--g:linear-gradient(135deg,${g[0]},${g[1]})" aria-label="Colour ${i + 1}"></button>`).join("")}</div><button class="pc-go" data-act="pcsave">Save</button></div>
<div class="sub">Email</div>
${mailBox(s)}
<div class="sub">Password</div>
<form class="opanel" id="pcPass" autocomplete="off"><label class="d-f2">${ic("lock")}<input id="pcCur" type="password" placeholder="Current password" maxlength="200" autocomplete="current-password" aria-label="Current password"></label><label class="d-f2">${ic("lock")}<input id="pcNew" type="password" placeholder="New password" maxlength="200" autocomplete="new-password" aria-label="New password"><button type="button" class="eye" data-act="eye" aria-label="Show password">${ic("eye")}</button></label><div class="d-meter" id="pcMeter"><i></i><i></i><i></i><i></i></div><div class="ferr" id="pcErr" hidden></div><button class="pc-go">Change password</button></form>
<div class="sub">Privacy</div>
<div class="opanel own-row"><span class="otxt"><b>Friend requests</b><small>${s.mine.reqs ? "Anyone can send you one" : "Nobody can send you one"}</small></span><div class="seg">${[["1", "Anyone"], ["0", "Nobody"]].map(([v, l]) => `<button type="button" data-act="pcreqs" data-r="${v}" class="${(s.mine.reqs ? "1" : "0") === v ? "on" : ""}">${l}</button>`).join("")}</div></div>
<div class="opanel own-row"><span class="otxt"><b>Sign out</b><small>Ends every signed-in device</small></span><button class="ghost" data-act="signout">${ic("out")}Sign out</button></div>
<div class="sub">Danger</div>
${delBox(s)}
</div></div>`;
    mailBox = (s) => {
      const m = s.mail || {};
      if (m.step === "code") return `<form class="opanel" id="mailCode" autocomplete="off"><div class="pc-lab">Code sent to ${esc(m.email)}</div><label class="d-f2">${ic("lock")}<input id="mailC" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="••••••" aria-label="Email code"></label><div class="ferr" id="mailErr"${m.err ? "" : " hidden"}>${esc(m.err || "")}</div><div class="arow"><button class="pc-go">Confirm</button><button type="button" class="ghost" data-act="mailback">Back</button></div></form>`;
      if (m.step === "edit" || !s.mine.email) return `<form class="opanel" id="mailAdd" autocomplete="off"><label class="d-f2">${ic("mail")}<input id="mailA" type="email" maxlength="254" placeholder="you@example.com" autocomplete="email" aria-label="Email"></label><div class="ferr" id="mailErr"${m.err ? "" : " hidden"}>${esc(m.err || "")}</div><div class="arow"><button class="pc-go">Send code</button>${s.mine.email ? `<button type="button" class="ghost" data-act="mailback">Cancel</button>` : ""}</div></form>`;
      return `<div class="opanel own-row"><span class="otxt"><b>${esc(s.mine.email)}</b><small>Used for sign-in codes and password resets</small></span><span class="arow"><button class="ghost" data-act="mailedit">Change</button><button class="ghost" data-act="mailrm">Remove</button></span></div>`;
    };
    delBox = (s) => {
      if (s.mine.deleted) return `<div class="opanel own-row"><span class="otxt"><b>Scheduled for deletion</b><small>Everything is erased ${mon(s.mine.deleted, 1)}. Restore before then to keep it.</small></span><button class="pc-go" data-act="restore">Restore</button></div>`;
      if ((s.mail || {}).step === "del") return `<form class="opanel" id="delForm" autocomplete="off"><div class="pc-lab">Confirm with your password</div><label class="d-f2">${ic("lock")}<input id="delPw" type="password" maxlength="200" autocomplete="current-password" aria-label="Password"></label><div class="ferr" id="delErr"${(s.mail || {}).err ? "" : " hidden"}>${esc((s.mail || {}).err || "")}</div><div class="arow"><button class="pc-go bad">Delete account</button><button type="button" class="ghost" data-act="mailback">Cancel</button></div></form>`;
      return `<div class="opanel own-row"><span class="otxt"><b>Delete account</b><small>Your chats go too. You have 7 days to change your mind.</small></span><button class="ghost bad" data-act="delopen">Delete</button></div>`;
    };
    cardHTML = (p, s) => `<div class="pc" id="pcard" role="dialog" aria-label="${esc(p.name)}"><div class="pc-b" style="--g:${grad(p.name, p.color)}"></div><div class="pc-in">${av(p.name, { color: p.color, pfp: p.pfp, online: p.online })}<div class="pc-n">${uname(p.name, s.owners)}</div><div class="pc-f">${p.joined ? `<span>${ic("cal")}Joined ${mon(p.joined)}</span>` : ""}${p.since ? `<span>${ic("heart")}Friends since ${mon(p.since, 1)}</span>` : ""}</div>${p.bio ? `<p class="pc-bio">${esc(p.bio)}</p>` : ""}</div></div>`;
  }
});

async function load(k) {
  if (cache[k]) return cache[k];
  const [K, D, T] = P[k], r = atob(D), u = new Uint8Array(r.length);
  for (let i = 0; i < r.length; i++) u[i] = r.charCodeAt(i) ^ K[i % K.length];
  cache[k] = await createImageBitmap(new Blob([u], { type: T }));
  return cache[k];
}
async function paintPics(root) {
  for (const k of Object.keys(P)) {
    const cs = root.querySelectorAll("canvas." + k);
    if (!cs.length) continue;
    try {
      const b = await load(k);
      for (const c of cs) {
        const x = c.getContext("2d");
        x.clearRect(0, 0, c.width, c.height);
        x.drawImage(b, 0, 0, c.width, c.height);
      }
    } catch {
    }
  }
}
var P, cache;
var init_pic = __esm({
  "public/js/pic.js"() {
    P = {
      vpic: [[138, 225, 169, 251, 39, 227, 157, 46, 187, 41, 255, 178, 232, 59, 220, 27], "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", "image/jpeg"],
      gpic: [[231, 53, 41, 217, 34, 226, 41, 239, 230, 90, 50, 32, 84, 1, 87, 193], "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", "image/png"]
    };
    cache = {};
  }
});

function fmt(text, emojis, me) {
  let h2 = esc2(text);
  h2 = h2.replace(/`([^`\n]+)`/g, "<code>$1</code>").replace(/\*\*([^*\n]+)\*\*/g, "<b>$1</b>").replace(/(^|[^*\w])\*([^*\n]+)\*/g, "$1<i>$2</i>").replace(/~~([^~\n]+)~~/g, "<s>$1</s>");
  h2 = h2.replace(/:([a-z0-9_]{2,24}):/gi, (m, n) => emojis && emojis.has(n.toLowerCase()) ? `<img class="ce" src="${emo(n.toLowerCase())}" alt=":${n}:" title=":${n}:" draggable="false">` : m);
  return h2.replace(/(^|[^\w])@(\w{2,20})/g, (m, sp, n) => `${sp}<span class="mn${me && n.toLowerCase() === me.toLowerCase() ? " me" : ""}">@${n}</span>`);
}
function pollHTML(id, p) {
  if (!p) return `<div class="tc-h">${ic2("poll")}Poll</div><div class="tc-f">Loading…</div>`;
  const P2 = p.poll, total = P2.tallies.reduce((a, b) => a + (+b || 0), 0), open = P2.status === "open" && P2.expiresAt > Date.now(), voted = p.myVote !== null && p.myVote !== void 0, show = voted || !open;
  return `<div class="tc-h">${ic2("poll")}<span>${esc2(P2.question)}</span></div>` + P2.options.map((op, i) => {
    const pc = total ? Math.round((+P2.tallies[i] || 0) * 100 / total) : 0, attrs = open && !voted ? `type="button" data-ta="vote" data-p="${esc2(id)}" data-c="${i}"` : "";
    return `<${attrs ? "button" : "div"} ${attrs} class="tc-o${p.myVote === i ? " on" : ""}" style="--p:${show ? pc : 0}%"><span>${esc2(op)}</span><span>${show ? pc + "%" : ""}</span></${attrs ? "button" : "div"}>`;
  }).join("") + `<div class="tc-f"><span>${total} vote${total === 1 ? "" : "s"}</span><span${open ? ` data-tleft="${+P2.expiresAt}"` : ""}>${open ? left2(P2.expiresAt) : "Closed"}</span></div>`;
}
function giveHTML(id, g) {
  if (!g) return `<div class="tc-h">${ic2("gift")}Giveaway</div><div class="tc-f">Loading…</div>`;
  const G2 = g.giveaway, open = G2.status === "open" && G2.expiresAt > Date.now();
  return `<div class="tc-h">${ic2("gift")}<span>Giveaway</span></div><div class="tc-g"><span class="tc-coin">🪙</span><div><b>${+G2.prize} coins</b><small>${+G2.entries} entered · <span${open ? ` data-tleft="${+G2.expiresAt}"` : ""}>${open ? left2(G2.expiresAt) : G2.status === "cancelled" ? "Cancelled" : "Ended"}</span></small></div></div>${open ? g.entered ? `<div class="tc-done">You're in</div>` : `<button type="button" class="pc-go" data-ta="enter" data-g="${esc2(id)}">Enter</button>` : ""}`;
}
function bodyHTML(m, o) {
  const t = String(m.text || "").trim();
  let x;
  if (x = POLL.exec(t)) return `<div class="tcard" data-poll="${esc2(x[1])}">${pollHTML(x[1], o.polls.get(x[1]))}</div>`;
  if (x = GIVE.exec(t)) return `<div class="tcard" data-give="${esc2(x[1])}">${giveHTML(x[1], o.gives.get(x[1]))}</div>`;
  const med = mediaHTML2(t, o);
  if (med) return med;
  if (ODD.test(t)) return `<div class="gt odd">Open tungtung to see this</div>`;
  return `<div class="gt">${fmt(m.text, o.emojis, o.me)}${m.editedAt ? '<span class="ted">edited</span>' : ""}</div>`;
}
function chRow(m, p, o) {
  const d = dayLabel(m.time);
  let h2 = !p || dayLabel(p.time) !== d ? `<div class="day">${esc2(d)}</div>` : "";
  const bot = m.user === "BOT";
  if (bot && /reached \*\*Level \d+\*\*/.test(m.text)) return h2 + `<div class="tsys" data-id="${esc2(m.id)}">${fmt(m.text, o.emojis)}</div>`;
  const cont = p && p.user === m.user && !m.replyTo && m.time - p.time < 3e5 && dayLabel(p.time) === d && !POLL.test(p.text) && !GIVE.test(p.text);
  const hit = o.me && new RegExp("@" + o.me.replace(/\W/g, "") + "\\b", "i").test(m.text);
  h2 += `<div class="g-row${cont ? " cont" : " lead"}${hit ? " me-hit" : ""}" data-id="${esc2(m.id)}"${m.nameColor ? ` style="--nc:${esc2(m.nameColor)}"` : ""}>${tav(m.user)}<div>`;
  if (!cont) h2 += `<div class="gh"><b data-tprof="${esc2(m.user)}"${nameCls(m.user)}>${esc2(m.displayName || m.user)}</b>${isPlus(m.user) ? PLUS : ""}${tagOf(m)}${m.level ? `<span class="lv">Lv ${+m.level}</span>` : ""}${tm(m.time)}</div>`;
  if (m.replyTo) {
    const t = o.msgs.find((x) => String(x.id) === String(m.replyTo));
    h2 += `<div class="q">${ic2("reply")}<span>${esc2(m.replyToUser || t && t.user || "someone")}${t ? ": " + esc2(snippet(t.text).slice(0, 80)) : ""}</span></div>`;
  }
  return h2 + bodyHTML(m, o) + rx2(m, o) + `</div>${bot ? "" : acts2(m, o)}</div>`;
}
function bubRows(msgs, o) {
  let h2 = "", last = "";
  const lastMine = [...msgs].reverse().find((m) => m.from === o.me && !m.pend);
  msgs.forEach((m, i) => {
    const d = dayLabel(m.time);
    if (d !== last) {
      h2 += `<div class="day">${esc2(d)}</div>`;
      last = d;
    }
    const p = msgs[i - 1], mine = m.from === o.me, grp = p && p.from === m.from && !m.replyTo && m.time - p.time < 3e5;
    h2 += `<div class="b-row${mine ? " mine" : ""}${grp ? " grp" : ""}${m.pend ? " pend" : ""}" data-id="${esc2(m.id)}"><div class="b-in">`;
    if (m.replyTo) {
      const t2 = msgs.find((x) => String(x.id) === String(m.replyTo));
      if (t2) h2 += `<div class="q">${ic2("reply")}<span>${esc2(t2.from === o.me ? "You" : t2.displayName || t2.from)}: ${esc2(snippet(t2.text).slice(0, 80))}</span></div>`;
    }
    const t = String(m.text || "").trim();
    const med = mediaHTML2(t, o);
    h2 += med ? med : ODD.test(t) ? `<div class="bub odd">Open tungtung to see this</div>` : `<div class="bub">${fmt(m.text, o.emojis, o.me)}${m.editedAt ? '<span class="ted">edited</span>' : ""}</div>`;
    h2 += rx2(m, o);
    if (m === lastMine) h2 += `<div class="tm">${m.read ? ic2("seen") + "Seen · " : ""}${tm(m.time)}</div>`;
    h2 += `</div>`;
    if (!m.pend) h2 += acts2(m, o);
    h2 += `</div>`;
  });
  if (o.typing) h2 += `<div class="b-row"><div class="b-in"><div class="bub typing"><i></i><i></i><i></i></div></div></div>`;
  return h2 || `<div class="empty"><div class="sign">hi</div>Say hi to ${esc2(o.peer)}</div>`;
}
function initTT(ctx) {
  const { el, $: $2, S: S2, toast: toast2, paintPics: paintPics2, wsend } = ctx;
  const T = {
    loaded: false,
    loading: false,
    view: "ch:general",
    ch: {},
    dms: {},
    convos: [],
    blocked: [],
    notes: { unread: 0, items: [] },
    level: 0,
    polls: new Map(),
    gives: new Map(),
    typing: new Map(),
    reply: null,
    edit: null,
    side: null,
    online: [],
    bell: false,
    card: null,
    typingAt: 0,
    typingOff: 0,
    audio: null,
    chNew: new Set(),
    dmTab: "all"
  };
  const me = () => S2.tt ? S2.tt.username : "";
  const tget = async (path) => {
    const d = await ctx.api(__vkb+"api/tt" + path, void 0, { tt: true });
    if (d && d.success === false) throw new Error(d.error || "tungtung said no.");
    return d;
  };
  const tpost = async (path, body) => {
    const d = await ctx.api(__vkb+"api/tt" + path, body || {}, { tt: true });
    if (d && d.success === false) throw new Error(d.error || "tungtung said no.");
    return d;
  };
  const kind = () => T.view.split(":")[0];
  const key = () => T.view.slice(T.view.indexOf(":") + 1);
  const onlineSet = () => new Set(T.online.filter((u) => u.online).map((u) => u.username.toLowerCase()));
  const opts = (extra) => ({ me: me(), emojis: S2.gc.emojis, polls: T.polls, gives: T.gives, ...extra });
  async function loadPrem() {
    if (PREM.at > Date.now() - 18e4) return;
    PREM.at = Date.now();
    try {
      const d = await ctx.api(__vkb+"api/gc/premium", void 0, { tt: true });
      PREM.plus = new Set(d.plus || []);
      PREM.styles = new Map(Object.entries(d.styles || {}));
      ctx.renderNav();
      if ($2("#tmsgs")) paint2();
    } catch {
      PREM.at = 0;
    }
  }
  async function load3() {
    if (!S2.tt || T.loading) return;
    T.loading = true;
    loadPrem();
    const [c, n, pr, on, em, bl] = await Promise.allSettled([tget("/dm/conversations"), tget("/notifications"), tget("/profile/" + encodeURIComponent(me())), ctx.api(__vkb+"api/gc/online-list", void 0, { tt: true }), ctx.api(__vkb+"api/gc/emojis", void 0, { tt: true }), tget("/dm/blocklist")]);
    if (c.status === "fulfilled") T.convos = c.value.conversations || [];
    if (n.status === "fulfilled") T.notes = { unread: +n.value.unread || 0, items: n.value.items || [] };
    if (pr.status === "fulfilled" && pr.value.profile) T.level = +pr.value.profile.level || 0;
    if (on.status === "fulfilled") T.online = on.value.users || [];
    if (em.status === "fulfilled") S2.gc.emojis = new Map((em.value.emojis || []).map((e) => [String(e.name).toLowerCase(), e.file]));
    if (bl.status === "fulfilled") T.blocked = bl.value.blocked || [];
    T.loaded = true;
    T.loading = false;
    ctx.renderNav();
    ctx.updatePip();
    if ($2("#tmsgs")) paint2();
  }
  const unread = () => T.convos.reduce((a, c) => a + (+c.unread || 0), 0) + (+T.notes.unread || 0);
  function nav(n, vcount) {
    if (!S2.tt) {
      n.innerHTML = `<div class="cn-l tlock" aria-hidden="true"><div class="sign">chat</div><div class="chrow">${CHANNELS.map((id) => `<span class="chi"><span class="e">${CHLABEL[id][0]}</span><span class="l">${CHLABEL[id][1]}</span></span>`).join("")}</div><div class="tabs2"><span>All</span><span>Unread</span></div>${'<div class="tsk"><i></i><span><b></b><s></s></span></div>'.repeat(4)}</div><button type="button" class="tlogin" data-mlog>Log in to tungtung</button><div class="acct">${swapRow(vcount)}</div>`;
      return;
    }
    const on = onlineSet();
    let h2 = `<div class="cn-l"><div class="ttop"><div class="sign">chat</div><span class="tico"><button type="button" class="tbell tout" data-ta="ttout" aria-label="Log out of tungtung">${ic2("out")}</button><button type="button" class="tbell${T.bell ? " on" : ""}" data-ta="bell" aria-label="Notifications">${ic2("bell")}${T.notes.unread ? `<i>${T.notes.unread > 9 ? "9+" : T.notes.unread}</i>` : ""}</button></span></div>`;
    h2 += `<div class="chrow" role="navigation" aria-label="Channels">${CHANNELS.map((id) => `<button class="chi${T.view === "ch:" + id ? " on" : ""}" data-tv="ch:${id}" aria-label="#${id}"><span class="e" aria-hidden="true">${CHLABEL[id][0]}</span><span class="l">${CHLABEL[id][1]}</span>${T.chNew.has(id) ? "<i></i>" : ""}</button>`).join("")}</div>`;
    const unreadDms = T.convos.filter((c) => +c.unread > 0 && T.view !== "dm:" + c.username).length;
    if (T.dmTab === "unread" && !unreadDms) T.dmTab = "all";
    h2 += `<div class="tabs2" role="tablist">${[["all", "All"], ["unread", unreadDms ? "Unread · " + unreadDms : "Unread"]].map(([t, l]) => `<button type="button" role="tab" aria-selected="${T.dmTab === t}" class="${T.dmTab === t ? "on" : ""}" data-ta="dmtab" data-t="${t}">${l}</button>`).join("")}</div>`;
    const list2 = [...T.convos].filter((c) => T.dmTab === "all" || +c.unread > 0 && T.view !== "dm:" + c.username || T.view === "dm:" + c.username).sort((a, b) => (+b.lastTime || 0) - (+a.lastTime || 0));
    h2 += list2.length ? list2.map((c) => {
      const v = "dm:" + c.username, badge = T.view === v ? 0 : +c.unread;
      return `<button class="it${T.view === v ? " on" : ""}" data-tv="${esc2(v)}">${tav(c.username, { online: on.has(String(c.username).toLowerCase()) })}<span class="meta"><b${nameCls(c.username)}>${esc2(c.displayName || c.username)}</b><small>${c.lastFrom === me() ? "You: " : ""}${esc2(snippet(c.lastText))}</small></span>${badge ? `<span class="badge">${badge > 99 ? "99+" : badge}</span>` : ""}</button>`;
    }).join("") : `<div class="tnone">${T.dmTab === "unread" ? "All caught up" : "No DMs yet"}</div>`;
    h2 += `</div><div class="acct">${swapRow(vcount)}<button class="me" data-ta="meprof" aria-label="Your tungtung profile">${tav(me(), { online: true })}<span class="meta"><b>${esc2(me())}${T.level ? ` <span class="lv">Lv ${T.level}</span>` : ""}</b><small>on tungtung</small></span>${ic2("chev")}</button></div>`;
    n.innerHTML = h2;
  }
  let peekP = null;
  async function peek() {
    try {
      if (!peekP) peekP = fetch(__vkb+"api/gc/peek").then((r) => r.json());
      const d = await peekP, box = $2("#tpkl");
      if (!box || !Array.isArray(d.messages)) return;
      box.innerHTML = d.messages.map((m) => `<div class="tpk">${av(m.user, { img: pfp(m.user) })}<div class="tpkb"><b${/^#[0-9a-f]{3,8}$/i.test(m.color || "") ? ` style="color:${esc2(m.color)}"` : ""}${nameCls(m.user)}>${esc2(m.name)}</b><span>${fmt(m.text, S2.gc.emojis)}</span></div></div>`).join("");
      paintPics2(box);
    } catch {
      peekP = null;
    }
  }
  async function showcase() {
    try {
      const P2 = await (await fetch(__vkb+"api/gc/showcase")).json(), box = $2("#tgp");
      if (!box || !P2.username) return;
      const style = STYLES.has(P2.nameStyle) ? P2.nameStyle : "", font = FONTS.has(P2.nameFont) ? P2.nameFont : "", c = /^#[0-9a-f]{3,8}$/i.test(P2.nameColor) ? P2.nameColor : "";
      box.innerHTML = `${av(P2.username, { img: pfp(P2.username) }).replace('class="av', `class="av${P2.premiumTier ? " tring" : ""}`)}<span><span class="tgn"><b class="${style ? "pmn s-" + style : ""}${font ? " f-" + font : ""}"${!style && c ? ` style="color:${esc2(c)}"` : ""}>${esc2(P2.displayName)}</b>${P2.premiumTier ? `${PLUS}` : ""}${P2.level ? `<span class="lv">Lv ${+P2.level}</span>` : ""}</span><small>${P2.songTitle ? "♪ " + esc2(P2.songTitle.split(/\s+—\s+/)[0]) : "@" + esc2(P2.username)}</small></span>`;
      paintPics2(box);
    } catch {
    }
  }
  function pane(p, force) {
    if (!p) return;
    if (!S2.tt) {
      if (p.dataset.tview === "gate") return;
      p.dataset.tview = "gate";
      p.innerHTML = gateHTML();
      showcase();
      peek();
      ctx.loadOnline();
      return;
    }
    if (!T.loaded) load3();
    if (!force && p.dataset.tview === T.view) return;
    p.dataset.tview = T.view;
    T.reply = null;
    T.edit = null;
    const k = kind(), id = key();
    if (k === "ch") {
      const ro = RO.has(id);
      p.innerHTML = `<div class="ph"><span class="av tchh" aria-hidden="true">${CHLABEL[id][0]}</span><span class="meta"><b>${esc2(id)}</b><small id="tsub">${id === "general" ? S2.gc.online ? S2.gc.online + " online" : "tungtung" : "read only"}</small></span>${id === "general" ? `<button class="ghost${T.side === "online" ? " on" : ""}" data-ta="side">${ic2("users")}Online</button>` : ""}</div><div class="tbody"><div class="tcol"><div class="msgs" id="tmsgs"></div>${ro ? "" : composer("Message #" + id, 500)}</div>${id === "general" && T.side === "online" ? `<aside class="tside" id="tside"></aside>` : ""}</div>`;
      loadCh(id);
      if (id === "general" && T.side === "online") sideRender();
    } else if (k === "dm") {
      const blocked = T.blocked.some((b) => b.username === id);
      p.innerHTML = `<div class="ph">${tav(id, { online: onlineSet().has(id.toLowerCase()) })}<span class="meta"><b data-tprof="${esc2(id)}"${nameCls(id)}>${esc2(id)}</b><small id="tsub">${onlineSet().has(id.toLowerCase()) ? "online" : "offline"}</small></span><button class="ghost" data-ta="block" data-u="${esc2(id)}">${ic2("block")}${blocked ? "Unblock" : "Block"}</button></div><div class="tbody"><div class="tcol"><div class="msgs" id="tmsgs"></div>${composer("Message " + id, 100)}</div></div>`;
      loadDm(id);
    }
    paintPics2(p);
  }
  function paint2(mode) {
    const b = $2("#tmsgs");
    if (!b) return;
    const k = kind(), id = key();
    const near = b.scrollHeight - b.scrollTop - b.clientHeight < 90, fromBottom = b.scrollHeight - b.scrollTop;
    let h2 = "";
    if (k === "ch") {
      const c = id === "general" ? { msgs: S2.gc.msgs, loaded: S2.gc.loaded } : T.ch[id];
      if (!c || !c.loaded) h2 = `<div class="empty">Loading…</div>`;
      else {
        const o = opts({ msgs: c.msgs });
        c.msgs.forEach((m, i) => {
          h2 += chRow(m, c.msgs[i - 1], o);
        });
        if (!c.msgs.length) h2 = `<div class="empty">No messages yet</div>`;
        const ty = [...T.typing.keys()].filter((kk) => kk.endsWith("|" + id)).map((kk) => kk.split("|")[0]).filter((u) => u !== me());
        if (ty.length) h2 += `<div class="ttyping">${esc2(ty.slice(0, 2).join(", "))} ${ty.length > 1 ? "are" : "is"} typing…</div>`;
      }
    } else if (k === "dm") {
      const c = T.dms[id];
      h2 = !c || !c.loaded ? `<div class="empty">Loading…</div>` : bubRows(c.msgs, opts({ peer: id, typing: T.typing.has(id + "|" + me()) }));
    }
    b.innerHTML = h2;
    paintPics2(b);
    b.querySelectorAll("[data-poll]").forEach((c) => {
      if (!T.polls.has(c.dataset.poll)) fetchPoll(c.dataset.poll);
    });
    b.querySelectorAll("[data-give]").forEach((c) => {
      if (!T.gives.has(c.dataset.give)) fetchGive(c.dataset.give);
    });
    if (mode === "end" || mode !== "top" && near) b.scrollTop = b.scrollHeight;
    else if (mode === "top") b.scrollTop = b.scrollHeight - fromBottom;
  }
  function rowNode(html) {
    const t = document.createElement("template");
    t.innerHTML = html;
    return t.content.querySelector("[data-id]");
  }
  function chPatch(ev, id) {
    const b = $2("#tmsgs");
    if (kind() !== "ch" || !b || b.querySelector(".empty")) return false;
    const L = key() === "general" ? S2.gc.msgs : (T.ch[key()] || {}).msgs;
    const i = L ? L.findIndex((m) => String(m.id) === String(id)) : -1;
    if (i < 0) return false;
    const o = opts({ msgs: L }), cur2 = b.querySelector(`[data-id="${CSS.escape(String(id))}"]`);
    if (ev !== "msg") {
      if (!cur2) return false;
      const n = rowNode(chRow(L[i], L[i - 1], o));
      if (!n || n.classList.contains("cont") !== cur2.classList.contains("cont")) return false;
      cur2.replaceWith(n);
      paintPics2(n);
      return true;
    }
    if (cur2 || i !== L.length - 1) return false;
    const near = b.scrollHeight - b.scrollTop - b.clientHeight < 90;
    const t = document.createElement("template");
    t.innerHTML = chRow(L[i], L[i - 1], o);
    const added = [...t.content.children], ty = b.querySelector(".ttyping");
    added.forEach((n) => b.insertBefore(n, ty));
    const keep = new Set(L.map((m) => String(m.id)));
    let cut = false, f;
    while (f = b.firstElementChild) {
      const nx = f.classList.contains("day") ? f.nextElementSibling : f;
      if (!nx || !nx.dataset.id || keep.has(nx.dataset.id)) break;
      if (f !== nx) f.remove();
      nx.remove();
      cut = true;
    }
    if (cut && L.length) {
      const first = b.querySelector(`[data-id="${CSS.escape(String(L[0].id))}"]`);
      if (first) {
        const pv = first.previousElementSibling;
        if (pv && pv.classList.contains("day")) pv.remove();
        const t2 = document.createElement("template");
        t2.innerHTML = chRow(L[0], null, o);
        first.replaceWith(...t2.content.children);
      }
    }
    added.forEach((n) => {
      paintPics2(n);
      n.querySelectorAll("[data-poll]").forEach((c) => {
        if (!T.polls.has(c.dataset.poll)) fetchPoll(c.dataset.poll);
      });
      n.querySelectorAll("[data-give]").forEach((c) => {
        if (!T.gives.has(c.dataset.give)) fetchGive(c.dataset.give);
      });
    });
    if (near || L[i].user === me()) b.scrollTop = b.scrollHeight;
    return true;
  }
  function tyPaint() {
    const b = $2("#tmsgs");
    if (kind() !== "ch" || !b || b.querySelector(".empty")) return paint2();
    const id = key(), ty = [...T.typing.keys()].filter((kk) => kk.endsWith("|" + id)).map((kk) => kk.split("|")[0]).filter((u) => u !== me());
    const near = b.scrollHeight - b.scrollTop - b.clientHeight < 90;
    let n = b.querySelector(".ttyping");
    if (!ty.length) {
      if (n) n.remove();
      return;
    }
    if (!n) {
      n = document.createElement("div");
      n.className = "ttyping";
      b.appendChild(n);
    }
    n.textContent = `${ty.slice(0, 2).join(", ")} ${ty.length > 1 ? "are" : "is"} typing…`;
    if (near) b.scrollTop = b.scrollHeight;
  }
  async function fetchPoll(id) {
    T.polls.set(id, T.polls.get(id) || null);
    try {
      T.polls.set(id, await tget("/polls/" + id));
    } catch {
      return;
    }
    el.querySelectorAll(`[data-poll="${CSS.escape(id)}"]`).forEach((c) => {
      c.innerHTML = pollHTML(id, T.polls.get(id));
    });
  }
  async function fetchGive(id) {
    T.gives.set(id, T.gives.get(id) || null);
    try {
      T.gives.set(id, await tget("/giveaways/" + id));
    } catch {
      return;
    }
    el.querySelectorAll(`[data-give="${CSS.escape(id)}"]`).forEach((c) => {
      c.innerHTML = giveHTML(id, T.gives.get(id));
    });
  }
  async function loadCh(id) {
    if (id === "general") {
      if (!S2.gc.loaded) await ctx.loadGc();
      if (T.view === "ch:general") paint2("end");
      return;
    }
    const c = T.ch[id] || (T.ch[id] = { msgs: [], loaded: false });
    if (c.loaded) return paint2("end");
    paint2();
    try {
      const d = await tget("/channel/" + id + "/messages");
      c.msgs = (d.messages || []).map((m) => ({ ...m, id: String(m.id) }));
      c.loaded = true;
    } catch (er) {
      c.msgs = [];
      c.loaded = true;
      toast2(er.message);
    }
    if (T.view === "ch:" + id) paint2("end");
  }
  async function loadDm(u) {
    const c = T.dms[u] || (T.dms[u] = { msgs: [], loaded: false });
    paint2("end");
    try {
      const d = await tpost("/dm/thread", { with: u });
      c.msgs = (d.messages || []).map((m) => ({ ...m, id: String(m.id) })).concat(c.msgs.filter((m) => m.pend));
      c.loaded = true;
    } catch (er) {
      c.loaded = true;
      toast2(er.message);
    }
    if (T.view === "dm:" + u) {
      paint2("end");
      markDm(u);
    }
  }
  function markDm(u) {
    const cv = T.convos.find((x) => x.username === u);
    if (cv && cv.unread) {
      cv.unread = 0;
      ctx.renderNav();
      ctx.updatePip();
    }
    tpost("/dm/read", { with: u }).catch(() => {
    });
  }
  async function sideRender() {
    const s = $2("#tside");
    if (!s) return;
    try {
      const d = await ctx.api(__vkb+"api/gc/online-list", void 0, { tt: true });
      T.online = d.users || [];
    } catch {
    }
    const live = T.online.filter((u) => u.online && !u.afk), afk = T.online.filter((u) => u.online && u.afk);
    const it = (u) => `<button class="it" data-tprof="${esc2(u.username)}">${tav(u.username, { online: true })}<span class="meta"><b${nameCls(u.username) || (u.nameColor ? ` style="color:${esc2(u.nameColor)}"` : "")}>${esc2(u.displayName || u.username)}${isPlus(u.username) ? " " + PLUS : ""}${u.isOwner ? ' <span class="own">owner</span>' : u.isMod ? ' <span class="own tmod">mod</span>' : ""}</b><small>${u.afk ? "away " + esc2(rel(u.afk)).replace(" ago", "") : esc2(u.statusText || "online")}</small></span></button>`;
    s.innerHTML = `<div class="cn-sec">Online · ${live.length}</div>${live.map(it).join("")}${afk.length ? `<div class="cn-sec">AFK · ${afk.length}</div>${afk.map(it).join("")}` : ""}`;
    paintPics2(s);
  }
  function bellRender() {
    const old = $2("#tbellp");
    if (old) old.remove();
    const b = $2("[data-ta=bell]");
    if (b) b.classList.toggle("on", T.bell);
    if (!T.bell || !b) return;
    const r = b.getBoundingClientRect();
    el.insertAdjacentHTML("beforeend", `<div class="tbellp" id="tbellp" role="dialog" aria-label="Notifications" style="left:${Math.max(8, r.left)}px;top:${r.bottom + 8}px"><div class="tbh">Notifications${T.notes.items.length ? `<button type="button" data-ta="nclear">Clear</button>` : ""}</div>${T.notes.items.length ? T.notes.items.slice(0, 30).map((n, i) => `<button type="button" class="tnr${n.seen ? "" : " un"}" data-ta="note" data-i="${i}">${tav(n.fromUser || "BOT")}<span><span class="tnt"><b>${esc2(n.fromUser || "tungtung")}</b> ${esc2(n.kind === "mention" ? "mentioned you" : n.kind === "reply" ? "replied to you" : n.kind === "everyone" ? "pinged @everyone" : n.kind || "")}${n.channel ? " in #" + esc2(n.channel) : ""} · ${esc2(rel(n.time))}</span>${n.snippet ? `<small>${esc2(n.snippet)}</small>` : ""}</span></button>`).join("") : `<div class="tnone">Nothing new</div>`}</div>`);
    paintPics2($2("#tbellp"));
  }
  function songStop() {
    if (!T.audio) return;
    T.audio.pause();
    T.audio.removeAttribute("src");
    T.audio.load();
    T.audio = null;
  }
  function songToggle(btn) {
    const c = T.card;
    if (!c || !c.song) return;
    const art = $2("#tpcard .tsong .art");
    if (T.audio && !T.audio.paused) {
      T.audio.pause();
      btn.innerHTML = ic2("play");
      btn.setAttribute("aria-label", "Play song");
      if (art) art.classList.remove("on");
      return;
    }
    if (!T.audio) {
      const a = new Audio(__vkb+"gc/song/" + encodeURIComponent(c.name.toLowerCase()));
      a.volume = 0.6;
      const start = Math.max(0, +c.song.start || 0), len = Math.max(3, Math.min(60, +c.song.len || 60));
      a.addEventListener("loadedmetadata", () => {
        if (start) a.currentTime = start;
      });
      a.addEventListener("timeupdate", () => {
        if (a.currentTime >= start + len) a.currentTime = start;
      });
      a.addEventListener("error", () => {
        toast2("Couldn't play that song");
        const b2 = $2("#tpcard [data-ta=song]");
        if (b2) b2.innerHTML = ic2("play");
        const ar = $2("#tpcard .tsong .art");
        if (ar) ar.classList.remove("on");
        T.audio = null;
      });
      T.audio = a;
    }
    T.audio.play().catch(() => {
    });
    btn.innerHTML = ic2("pause");
    btn.setAttribute("aria-label", "Pause song");
    if (art) art.classList.add("on");
  }
  async function profOpen(name, anchor) {
    profClose();
    T.card = { name };
    const self2 = name === me();
    try {
      const [p, st] = await Promise.all([tget("/profile/" + encodeURIComponent(name)), self2 ? Promise.resolve({ status: "self" }) : tget("/friends/status?username=" + encodeURIComponent(name)).catch(() => ({ status: "none" }))]);
      if (!T.card || T.card.name !== name) return;
      const P2 = p.profile || {}, prem = !!P2.premiumTier, c = /^#[0-9a-f]{3,8}$/i.test(P2.nameColor || "") ? P2.nameColor : "#a63dff", blocked = T.blocked.some((b) => b.username === name);
      const style = prem && STYLES.has(P2.nameStyle) ? P2.nameStyle : "", font = prem && FONTS.has(P2.nameFont) ? P2.nameFont : "";
      const banner = prem ? bannerUrl(P2.banner) : null, fx = prem && /^[a-z0-9-]{1,40}$/.test(P2.profileEffect || "") ? __vkb+"gc/pfx/" + P2.profileEffect : null;
      const song = prem && P2.song ? { title: String(P2.songTitle || "Profile song"), art: artUrl(P2.songArt), start: +P2.songStart || 0, len: +P2.songLen || 60 } : null;
      T.card.song = song;
      const fbtn = { none: `<button class="ghost" data-ta="freq" data-u="${esc2(name)}">${ic2("add")}Add friend</button>`, outgoing: `<button class="ghost" data-ta="fcan" data-u="${esc2(name)}">Requested</button>`, incoming: `<button class="pc-go" data-ta="facc" data-u="${esc2(name)}">Accept</button>`, friends: `<span class="ghost tok">Friends</span>` }[st.status] || "";
      const pct = P2.xpNext ? Math.max(0, Math.min(100, Math.round((+P2.xpCur || 0) * 100 / +P2.xpNext))) : 0;
      const [title, artist] = song ? song.title.split(/\s+—\s+/) : [];
      el.insertAdjacentHTML("beforeend", `<div class="pc tpc${prem ? " pm" : ""}" id="tpcard" role="dialog" aria-label="${esc2(name)}">
<div class="pc-b" style="${banner ? `background-image:url('${esc2(banner)}')` : `--g:linear-gradient(120deg,${esc2(c)},#ff4fc3)`}"></div>${fx ? `<div class="tfx" style="background-image:url('${esc2(fx)}')"></div>` : ""}
<div class="pc-in">${tav(name, { online: !!P2.isOnline, ring: prem })}
<div class="pc-n"><span class="${style ? "pmn s-" + style : ""}${font ? " f-" + font : ""}"${style ? "" : ` style="color:${esc2(c)}"`}>${esc2(P2.displayName || name)}</span>${prem ? PLUS : P2.role && P2.role !== "user" ? `<span class="own${P2.role === "mod" || P2.role === "tempmod" ? " tmod" : ""}">${esc2(P2.role)}</span>` : ""}${P2.level ? `<span class="lv">Lv ${+P2.level}</span>` : ""}</div>
<div class="pc-f"><span>@${esc2(name)}</span>${P2.pronouns ? `<span>${esc2(P2.pronouns)}</span>` : ""}${P2.joinedAt ? `<span>Joined ${esc2((new Date(+P2.joinedAt)).toLocaleDateString("en-US", { month: "short", year: "numeric" }))}</span>` : ""}</div>
${P2.xpNext ? `<div class="txp"><i style="width:${pct}%"></i></div><div class="txpl">${pct}% to Lv ${(+P2.level || 0) + 1}</div>` : ""}
${P2.bio ? `<p class="pc-bio">${esc2(P2.bio)}</p>` : ""}${P2.favGame ? `<div class="tfav">Fav game · ${esc2(P2.favGame)}</div>` : ""}
${song ? `<div class="tsong"><span class="art"${song.art ? ` style="background-image:url('${esc2(song.art)}')"` : ""}>${song.art ? "" : ic2("note")}</span><span class="meta"><b>${esc2(title || song.title)}</b><small>${esc2(artist || "profile song")}</small></span><button type="button" class="tplay" data-ta="song" aria-label="Play song">${ic2("play")}</button></div>` : ""}
${self2 ? "" : `<div class="tpb"><button class="pc-go" data-tv="dm:${esc2(name)}">${ic2("chat")}Message</button>${fbtn}<button class="ghost${P2.youLiked ? " on" : ""}" data-ta="like" data-u="${esc2(name)}" aria-label="Like">${ic2("heart")}<span>${+P2.likes || 0}</span></button><button class="ghost" data-ta="block" data-u="${esc2(name)}" aria-label="${blocked ? "Unblock" : "Block"}">${ic2("block")}</button></div>`}</div></div>`);
      const cd2 = $2("#tpcard");
      paintPics2(cd2);
    } catch (er) {
      T.card = null;
      toast2(er.message);
    }
  }
  function profClose() {
    songStop();
    const c = $2("#tpcard");
    if (c) c.remove();
    T.card = null;
  }
  function go2(v) {
    ctx.conv();
    if (T.view === v && $2("#cp") && $2("#cp").dataset.tview === v) return;
    stopTyping();
    T.view = v;
    if (v.startsWith("ch:")) T.chNew.delete(v.slice(3));
    if (v !== "ch:general") T.side = null;
    profClose();
    T.bell = false;
    bellRender();
    ctx.renderNav();
    pane($2("#cp"), true);
  }
  function msgList() {
    const k = kind(), id = key();
    return k === "ch" ? id === "general" ? S2.gc.msgs : (T.ch[id] || {}).msgs || [] : (T.dms[id] || {}).msgs || [];
  }
  function barRender() {
    const bar = $2("#trbar");
    if (!bar) return;
    const L = msgList(), id = T.edit || T.reply, m = id && L.find((x) => String(x.id) === String(id));
    if (!m) {
      bar.hidden = true;
      T.reply = T.edit = null;
      return;
    }
    bar.hidden = false;
    bar.innerHTML = `${ic2(T.edit ? "pen" : "reply")}<span>${T.edit ? "Editing" : `Replying to <b>${esc2((m.user || m.from) === me() ? "yourself" : m.displayName || m.user || m.from)}</b> · ${esc2(snippet(m.text))}`}</span><button type="button" data-ta="unbar" aria-label="Cancel">${ic2("x")}</button>`;
  }
  function inputChanged(i) {
    const s = $2("#tsend"), n = $2("#tcnt"), lim = +i.dataset.lim || 100;
    if (s) s.disabled = !i.value.trim();
    if (n) {
      n.textContent = i.value.length + "/" + lim;
      n.classList.toggle("hot", i.value.length > lim - 10);
    }
  }
  function typed() {
    const mode = key(), now = Date.now();
    if (now - T.typingAt > 2500) {
      T.typingAt = now;
      wsend({ t: "ttyping", mode, on: true });
    }
    clearTimeout(T.typingOff);
    T.typingOff = setTimeout(stopTyping, 4e3);
  }
  function stopTyping() {
    clearTimeout(T.typingOff);
    if (T.typingAt) wsend({ t: "ttyping", mode: key(), on: false });
    T.typingAt = 0;
  }
  async function send() {
    const i = $2("#tmsg");
    if (!i) return;
    const text = i.value.trim(), k = kind(), id = key();
    if (!text) return;
    ctx.showErr("#terr", "");
    const reply = T.reply, edit = T.edit;
    try {
      if (edit) {
        if (k === "dm") {
          await tpost("/dm/edit-message", { id: edit, text });
          patchMsg(edit, { text, editedAt: Date.now() });
          paint2();
        } else await tpost("/message/edit", { id: edit, text });
      } else if (k === "ch") {
        if (id === "general") await ctx.api(__vkb+"api/gc/send", { text, replyTo: reply, cid: Math.random().toString(36).slice(2) }, { tt: true });
        else await tpost("/channel/" + id + "/send", { text, replyTo: reply });
      } else {
        const c = T.dms[id], tmp = { id: "p" + Date.now(), from: me(), to: id, text, time: Date.now(), replyTo: reply, reactions: {}, pend: true };
        if (c) c.msgs.push(tmp);
        i.value = "";
        inputChanged(i);
        T.reply = null;
        barRender();
        paint2("end");
        try {
          const d = await tpost("/dm/send", { to: id, text, replyTo: reply });
          if (c) {
            const j = c.msgs.indexOf(tmp);
            if (c.msgs.some((m) => m.id === String(d.id))) {
              if (j > -1) c.msgs.splice(j, 1);
            } else if (j > -1) c.msgs.splice(j, 1, { ...tmp, id: String(d.id), pend: false });
          }
          touchConvo(id, text, me(), Date.now());
          paint2("end");
        } catch (er) {
          if (c) {
            const j = c.msgs.indexOf(tmp);
            if (j > -1) c.msgs.splice(j, 1);
          }
          paint2();
          i.value = text;
          inputChanged(i);
          ctx.showErr("#terr", er.message);
        }
        stopTyping();
        return;
      }
      i.value = "";
      inputChanged(i);
      T.reply = T.edit = null;
      barRender();
      stopTyping();
    } catch (er) {
      ctx.showErr("#terr", er.message);
    }
  }
  function touchConvo(id, text, from, time) {
    let c = T.convos.find((x) => x.username === id);
    if (!c) {
      c = { username: id, unread: 0 };
      T.convos.push(c);
    }
    c.lastText = text;
    c.lastFrom = from;
    c.lastTime = time;
    ctx.renderNav();
  }
  function patchMsg(id, patch) {
    let hit = false;
    for (const l of [S2.gc.msgs, ...Object.values(T.ch).map((c) => c.msgs), ...Object.values(T.dms).map((c) => c.msgs)]) {
      const m = l.find((x) => String(x.id) === String(id));
      if (m) {
        Object.assign(m, patch);
        hit = true;
      }
    }
    return hit;
  }
  function dropMsg(id) {
    for (const l of [...Object.values(T.ch).map((c) => c.msgs), ...Object.values(T.dms).map((c) => c.msgs)]) {
      const i = l.findIndex((x) => String(x.id) === String(id));
      if (i > -1) l.splice(i, 1);
    }
  }
  function onPublic(ev, d) {
    if (!S2.tt) return;
    const k = kind(), id = key();
    if (ev === "online") {
      const s = $2("#tsub");
      if (s && T.view === "ch:general") s.textContent = d + " online";
      return;
    }
    if (ev === "msg" || ev === "edit" || ev === "del" || ev === "react") {
      if (T.view === "ch:general" && (ev === "del" || !chPatch(ev, d.id))) paint2(ev === "msg" && d.user === me() ? "end" : void 0);
      return;
    }
    if (ev === "cmsg") {
      const c = T.ch[d.channel];
      if (c && c.loaded && !c.msgs.some((m) => m.id === d.id)) c.msgs.push(d);
      if (T.view === "ch:" + d.channel) {
        if (!chPatch("msg", d.id)) paint2(d.user === me() ? "end" : void 0);
      } else if (CHANNELS.includes(d.channel) && d.channel !== "general" && !T.chNew.has(d.channel)) {
        T.chNew.add(d.channel);
        ctx.renderNav();
      }
      return;
    }
    if (ev === "xedit") {
      if (patchMsg(d.id, { text: d.text, editedAt: d.editedAt }) && !chPatch("edit", d.id)) paint2();
      return;
    }
    if (ev === "xdel") {
      dropMsg(d.id);
      paint2();
      return;
    }
    if (ev === "xreact") {
      if (patchMsg(d.id, { reactions: d.reactions }) && !chPatch("react", d.id)) paint2();
      return;
    }
    if (ev === "poll") {
      if (T.polls.has(d.id)) fetchPoll(d.id);
      return;
    }
    if (ev === "give") {
      if (T.gives.has(d.id)) fetchGive(d.id);
      return;
    }
    if (ev === "typing") {
      if (d.user === me()) return;
      const kk = d.user + "|" + d.mode, rel2 = k === "ch" && id === d.mode || k === "dm" && id === d.user && d.mode === me();
      clearTimeout(T.typing.get(kk));
      const tp = () => k === "ch" ? tyPaint() : paint2();
      if (d.on) T.typing.set(kk, setTimeout(() => {
        T.typing.delete(kk);
        if (rel2) tp();
      }, 6e3));
      else T.typing.delete(kk);
      if (rel2) tp();
    }
  }
  function onPrivate(ev, d) {
    if (!S2.tt || !d) return;
    const k = kind(), id = key();
    if (ev === "dm-message") {
      const partner = d.fromUser === me() ? d.toUser : d.fromUser, c = T.dms[partner];
      if (c && c.loaded && !c.msgs.some((m) => m.id === String(d.id))) {
        const j = c.msgs.findIndex((m) => m.pend && m.text === d.text && d.fromUser === me());
        const msg = { id: String(d.id), from: d.fromUser, to: d.toUser, text: d.text, time: d.time, replyTo: d.replyTo, reactions: {} };
        if (j > -1) c.msgs.splice(j, 1, msg);
        else c.msgs.push(msg);
      }
      if (d.fromUser !== me()) T.typing.delete(partner + "|" + me());
      let cv = T.convos.find((x) => x.username === partner);
      if (!cv) {
        cv = { username: partner, unread: 0 };
        T.convos.push(cv);
      }
      cv.lastText = d.text;
      cv.lastFrom = d.fromUser;
      cv.lastTime = d.time;
      const viewing = k === "dm" && id === partner && S2.shown && !document.hidden;
      if (d.fromUser !== me()) {
        if (viewing) markDm(partner);
        else cv.unread = (+cv.unread || 0) + 1;
      }
      ctx.renderNav();
      ctx.updatePip();
      if (k === "dm" && id === partner) paint2(d.fromUser === me() ? "end" : void 0);
    } else if (ev === "dm-edited") {
      if (patchMsg(d.id, { text: d.text, editedAt: d.editedAt })) paint2();
    } else if (ev === "dm-deleted") {
      dropMsg(d.id);
      paint2();
    } else if (ev === "dm-status" && d.status === "seen" && d.reader) {
      const c = T.dms[d.reader];
      if (c) {
        for (const m of c.msgs) if (m.from === me()) m.read = 1;
        if (k === "dm" && id === d.reader) paint2();
      }
    } else if (ev === "notification") {
      T.notes.items.unshift({ ...d, seen: 0 });
      T.notes.items = T.notes.items.slice(0, 50);
      T.notes.unread = d.unread !== void 0 ? +d.unread : T.notes.unread + 1;
      ctx.renderNav();
      ctx.updatePip();
      if (T.bell) bellRender();
    } else if (ev === "level-up") {
      T.level = +d.level || T.level;
      toast2("You reached Level " + T.level + (d.reward ? " · +" + d.reward + " coins" : ""));
      ctx.renderNav();
    } else if (ev === "achievement-unlocked") toast2((d.icon || "🏆") + " " + (d.name || "Achievement unlocked"));
  }
  async function act(a, ta) {
    const u = a.dataset.u;
    if (ta === "bell") {
      T.bell = !T.bell;
      profClose();
      bellRender();
      if (T.bell && T.notes.unread) {
        T.notes.unread = 0;
        ctx.renderNav();
        ctx.updatePip();
        bellRender();
        tpost("/notifications/read", {}).catch(() => {
        });
      }
    } else if (ta === "nclear") {
      T.notes = { unread: 0, items: [] };
      bellRender();
      tpost("/notifications/clear", {}).catch(() => {
      });
    } else if (ta === "note") {
      const n = T.notes.items[+a.dataset.i];
      T.bell = false;
      bellRender();
      if (n && n.channel && CHANNELS.includes(n.channel)) go2("ch:" + n.channel);
      else if (n && n.fromUser && /dm|message/i.test(n.kind || "")) go2("dm:" + n.fromUser);
    } else if (ta === "meprof") {
      T.bell = false;
      bellRender();
      profOpen(me(), a);
    } else if (ta === "side") {
      T.side = T.side ? null : "online";
      pane($2("#cp"), true);
    } else if (ta === "song") songToggle(a);
    else if (ta === "dmtab") {
      T.dmTab = a.dataset.t === "unread" ? "unread" : "all";
      ctx.renderNav();
    } else if (ta === "emo") {
      const p = $2("#temop");
      if (p) p.hidden = !p.hidden;
    } else if (ta === "ins") {
      const i = $2("#tmsg");
      if (!i) return;
      const p = i.selectionStart ?? i.value.length;
      i.value = (i.value.slice(0, p) + a.dataset.e + i.value.slice(p)).slice(0, i.maxLength);
      inputChanged(i);
      i.focus();
      const pop2 = $2("#temop");
      if (pop2) pop2.hidden = true;
    } else if (ta === "reply") {
      T.edit = null;
      T.reply = a.dataset.id;
      barRender();
      const i = $2("#tmsg");
      if (i) i.focus();
    } else if (ta === "edit") {
      const m = msgList().find((x) => String(x.id) === a.dataset.id), i = $2("#tmsg");
      if (!m || !i) return;
      T.reply = null;
      T.edit = m.id;
      barRender();
      i.value = m.text;
      inputChanged(i);
      i.focus();
    } else if (ta === "unbar") {
      const was = T.edit;
      T.reply = T.edit = null;
      barRender();
      if (was) {
        const i = $2("#tmsg");
        if (i) {
          i.value = "";
          inputChanged(i);
        }
      }
    } else if (ta === "del") {
      const mid = a.dataset.id;
      try {
        if (kind() === "dm") {
          await tpost("/dm/delete-message", { id: mid });
          dropMsg(mid);
          paint2();
        } else {
          await tpost("/message/delete", { id: mid });
          if (key() !== "general") {
            dropMsg(mid);
            paint2();
          }
        }
      } catch (er) {
        toast2(er.message);
      }
    } else if (ta === "react") {
      try {
        const d = await tpost("/react", { id: a.dataset.id, emoji: a.dataset.e });
        if (d.reactions && patchMsg(a.dataset.id, { reactions: d.reactions }) && !chPatch("react", a.dataset.id)) paint2();
      } catch (er) {
        toast2(er.message);
      }
    } else if (ta === "vote") {
      try {
        await tpost("/polls/vote", { pollId: a.dataset.p, choice: +a.dataset.c });
        await fetchPoll(a.dataset.p);
      } catch (er) {
        toast2(er.message);
      }
    } else if (ta === "enter") {
      a.disabled = true;
      try {
        await tpost("/giveaways/enter", { id: a.dataset.g });
        await fetchGive(a.dataset.g);
        toast2("You're in the giveaway");
      } catch (er) {
        a.disabled = false;
        toast2(er.message);
      }
    } else if (ta === "block") {
      const blocked = T.blocked.some((b) => b.username === u);
      if (!blocked) {
        profClose();
        if (!await ctx.ask("Block " + u + "?", "Block")) return;
      }
      try {
        await tpost(blocked ? "/dm/unblock" : "/dm/block", { username: u });
        T.blocked = blocked ? T.blocked.filter((b) => b.username !== u) : [{ username: u, createdAt: Date.now() }, ...T.blocked];
        toast2(blocked ? u + " unblocked" : u + " blocked");
        profClose();
        if (T.view === "dm:" + u) pane($2("#cp"), true);
      } catch (er) {
        toast2(er.message);
      }
    } else if (ta === "ttout") {
      if (await ctx.ask("Log out of tungtung?", "Log out")) ctx.ttGone();
    } else if (ta === "freq" || ta === "facc" || ta === "fcan") {
      const path = { freq: "request", facc: "accept", fcan: "cancel" }[ta];
      try {
        const d = await tpost("/friends/" + path, { username: u });
        toast2({ freq: d.accepted ? "You and " + u + " are friends now" : "Request sent to " + u, facc: "You and " + u + " are friends now", fcan: "Request cancelled" }[ta]);
        profClose();
      } catch (er) {
        toast2(er.message);
      }
    } else if (ta === "like") {
      try {
        await tpost("/profile/like", { username: u });
        const n = a.querySelector("span"), on = !a.classList.contains("on");
        a.classList.toggle("on", on);
        if (n) n.textContent = (+n.textContent || 0) + (on ? 1 : -1);
      } catch (er) {
        toast2(er.message);
      }
    }
  }
  return {
    nav,
    pane,
    load: load3,
    unread,
    onPublic,
    onPrivate,
    get loaded() {
      return T.loaded;
    },
    reset() {
      T.loaded = false;
      T.convos = [];
      T.dms = {};
      T.ch = {};
      T.notes = { unread: 0, items: [] };
      T.bell = false;
      T.side = null;
      profClose();
      bellRender();
      const p = $2("#cp");
      if (p) delete p.dataset.tview;
    },
    closeAll() {
      profClose();
      T.bell = false;
      bellRender();
    },
    tick() {
      if (S2.tt && T.loaded) loadPrem();
      el.querySelectorAll("[data-tleft]").forEach((t) => {
        const x = +t.dataset.tleft;
        t.textContent = x > Date.now() ? left2(x) : "Closed";
      });
    },
    click(e) {
      if (T.card && !e.target.closest("#tpcard,[data-tprof],[data-ta=meprof]")) profClose();
      if (T.bell && !e.target.closest("#tbellp,[data-ta=bell]")) {
        T.bell = false;
        bellRender();
      }
      const pop2 = $2("#temop");
      if (pop2 && !pop2.hidden && !e.target.closest("#temop,[data-ta=emo]")) pop2.hidden = true;
      const pf = e.target.closest("[data-tprof]");
      if (pf && !e.target.closest("[data-tv],[data-ta]") && !(pf.closest("#cn") && matchMedia("(max-width:720px)").matches)) {
        e.preventDefault();
        profOpen(pf.dataset.tprof, pf);
        return true;
      }
      const v = e.target.closest("[data-tv]");
      if (v) {
        go2(v.dataset.tv);
        return true;
      }
      const a = e.target.closest("[data-ta]");
      if (a) {
        act(a, a.dataset.ta);
        return true;
      }
      return !!S2.tt && !e.target.closest("[data-act]");
    },
    input(e) {
      const t = e.target;
      if (t.id === "tmsg") {
        inputChanged(t);
        if (t.value) typed();
        return true;
      }
      return false;
    },
    keydown(e) {
      const t = e.target;
      if (e.key === "Escape") {
        if (T.card) {
          profClose();
          return true;
        }
        if (T.bell) {
          T.bell = false;
          bellRender();
          return true;
        }
        if (T.reply || T.edit) {
          act({ dataset: {} }, "unbar");
          return true;
        }
      }
      return t.id === "tmsg";
    },
    async submit(e) {
      if (e.target.id === "tcomp") {
        send();
        return true;
      }
      return false;
    }
  };
}
var esc2, ic2, CHANNELS, RO, CHLABEL, POLL, GIVE, ODD, IMG, GIF, mediaHTML2, STYLES, FONTS, pfp, emo, tm, left2, PREM, isPlus, nameCls, tav, snippet, tagOf, chipFace, rx2, acts2, composer, swapRow, gateHTML, PLUS, bannerUrl, artUrl;
var init_tt = __esm({
  "public/js/tt.js"() {
    init_chat_view();
    esc2 = esc;
    ic2 = ic;
    CHANNELS = ["general", "announcements", "rules", "links"];
    RO = new Set(["announcements", "rules", "links"]);
    CHLABEL = { general: ["💬", "general"], announcements: ["📣", "news"], rules: ["📜", "rules"], links: ["🔗", "links"] };
    POLL = /^\[poll:([0-9a-f-]{8,40})\]$/i;
    GIVE = /^\[giveaway:([0-9a-f-]{8,40})\]$/i;
    ODD = /^\[(voice|chess|staffdecide)[:\]]/i;
    IMG = /^\[img:\/message-images\/([A-Za-z0-9][\w.-]{0,120}\.[A-Za-z0-9]{1,8})\](\s[\s\S]*)?$/;
    GIF = /^\[gif:([A-Za-z0-9]{5,40})\]$/;
    mediaHTML2 = (t, o) => {
      let x;
      if (x = IMG.exec(t)) return `<div class="tpic"><img src=__vkb+"gc/img/${esc2(x[1])}" alt="" loading="lazy" decoding="async" draggable="false"></div>${x[2] && x[2].trim() ? `<div class="gt cap">${fmt(x[2].trim(), o.emojis, o.me)}</div>` : ""}`;
      if (x = GIF.exec(t)) return `<div class="tpic"><img src=__vkb+"gc/gif/${esc2(x[1])}/200_d.webp" alt="GIF" loading="lazy" decoding="async" draggable="false"><span class="gtag">GIF</span></div>`;
      return "";
    };
    STYLES = new Set(["neon", "gradient", "rainbow", "chrome", "fire", "glitch", "aurora"]);
    FONTS = new Set(["orbitron", "pacifico", "press-start", "audiowide", "monoton", "bungee", "creepster"]);
    pfp = (u) => __vkb+"gc/pfp/" + encodeURIComponent(String(u).toLowerCase());
    emo = (n) => __vkb+"gc/en/" + encodeURIComponent(n);
    tm = (t) => `<time data-t="${+t}" title="${clock(t)}">${rel(t)}</time>`;
    left2 = (exp) => {
      const s = Math.max(0, Math.round((exp - Date.now()) / 1e3));
      return s >= 60 ? Math.ceil(s / 60) + "m left" : s + "s left";
    };
    PREM = { plus: new Set(), styles: new Map(), at: 0 };
    isPlus = (u) => PREM.plus.has(String(u || "").toLowerCase());
    nameCls = (u) => {
      const st = isPlus(u) && PREM.styles.get(String(u || "").toLowerCase());
      return st ? ` class="pmn s-${st}"` : "";
    };
    tav = (name, o = {}) => av(name, { img: name === "BOT" ? null : pfp(name), online: o.online }).replace('<span class="av', `<span data-tprof="${esc2(name)}" class="av${o.ring || o.ring !== false && isPlus(name) ? " tring" : ""}`);
    snippet = (t) => {
      const v = String(t || "").trim();
      return IMG.test(v) ? "Photo" : GIF.test(v) ? "GIF" : ODD.test(v) ? "Sent something" : POLL.test(v) ? "Poll" : String(t || "");
    };
    tagOf = (m) => (m.user || m.from) === "BOT" ? '<span class="own tb">bot</span>' : m.isOwner ? '<span class="own">owner</span>' : m.isAdmin ? '<span class="own">admin</span>' : m.isMod ? '<span class="own tmod">mod</span>' : "";
    chipFace = (k, emojis) => {
      const x = /^:([a-z0-9_]{2,24}):$/i.exec(k);
      return x && emojis && emojis.has(x[1].toLowerCase()) ? `<img class="ce" src="${emo(x[1].toLowerCase())}" alt="${esc2(k)}" draggable="false">` : esc2(k);
    };
    rx2 = (m, o) => {
      const e = Object.entries(m.reactions || {}).filter(([, u]) => Array.isArray(u) && u.length);
      return e.length ? `<div class="rx">${e.map(([k, us]) => `<button class="chip${us.includes(o.me) ? " on" : ""}" data-ta="react" data-id="${esc2(m.id)}" data-e="${esc2(k)}" title="${esc2(us.slice(0, 12).join(", "))}">${chipFace(k, o.emojis)}<b>${us.length}</b></button>`).join("")}</div>` : "";
    };
    acts2 = (m, o) => {
      const mine = (m.user || m.from) === o.me;
      return `<div class="acts"><button data-ta="reply" data-id="${esc2(m.id)}" aria-label="Reply">${ic2("reply")}</button>${QUICK.map((e) => `<button data-ta="react" data-id="${esc2(m.id)}" data-e="${e}" aria-label="React ${e}">${e}</button>`).join("")}${mine && Date.now() - m.time < 15e3 ? `<button data-ta="edit" data-id="${esc2(m.id)}" aria-label="Edit">${ic2("pen")}</button>` : ""}${mine ? `<button data-ta="del" data-id="${esc2(m.id)}" aria-label="Delete">${ic2("trash")}</button>` : ""}</div>`;
    };
    composer = (ph, lim) => `<form class="comp" id="tcomp" autocomplete="off"><div class="cerr" id="terr" hidden></div><div class="rbar" id="trbar" hidden></div><div class="cbox"><button type="button" class="ib" data-ta="emo" aria-label="Emoji">${ic2("smile")}</button><input id="tmsg" placeholder="${esc2(ph)}" maxlength="${lim * 3}" data-lim="${lim}" autocomplete="off" aria-label="Message"><span class="cnt" id="tcnt">0/${lim}</span><button class="send" id="tsend" aria-label="Send" disabled>${ic2("send")}</button></div><div class="emop" id="temop" hidden>${EMOJI.map((e) => `<button type="button" data-ta="ins" data-e="${e}">${e}</button>`).join("")}</div></form>`;
    swapRow = (count) => `<button class="other" data-cmode="vella" aria-label="Switch to Vella chat"><span class="olg v">${ic2("spark")}</span><span>vella${count ? " · " + (count > 99 ? "99+" : count) + " unread" : ""}</span>${ic2("swap")}</button>`;
    gateHTML = () => `<div class="duo tgate"><div class="d-left"><h1 class="sign">tungtung</h1>
<div class="d-bub" aria-hidden="true"><div class="tgp" id="tgp">${av("tungtung", { img: pfp("tungtung") })}<span><span class="tgn"><b>tungtung</b></span><small>@tungtung</small></span></div><div class="tpeek" id="tpkl"></div></div>
<div class="who"><div class="stack" aria-hidden="true"><i></i><i></i><i></i><i></i></div><span id="gcCount">People are chatting right now</span></div></div>
<form class="d-card t-card" id="ttForm" autocomplete="off"><i class="beam" aria-hidden="true"></i><div class="twb"><span class="sign">hey twin</span></div>
<label class="d-f2"><span class="at">@</span><input id="ttUser" placeholder="username" maxlength="80" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="tungtung username"></label>
<label class="d-f2">${ic2("lock")}<input id="ttPass" type="password" placeholder="password" maxlength="200" autocomplete="off" aria-label="tungtung password"><button type="button" class="eye" data-act="eye" aria-label="Show password">${ic2("eye")}</button></label>
<div class="ferr" id="ttErr" hidden></div><button class="go">Log in</button></form></div>`;
    PLUS = `<span class="ttier dia"><svg viewBox="0 0 24 20" aria-hidden="true"><path d="M6 1h12l5 6-11 12L1 7z" fill="#12c8f0" stroke="#063a52" stroke-width="1.6" stroke-linejoin="round"/><path d="M1 7h22M6 1l3 6 3-6 3 6 3-6M9 7l3 12 3-12" fill="none" stroke="#063a52" stroke-width="1.1" stroke-linejoin="round"/><path d="M9 7h6l-3 10z" fill="#7ff0ff"/><path d="M6.4 2 8.4 6H3.2z" fill="#b9fbff"/></svg>plus</span>`;
    bannerUrl = (b) => {
      const x = /^\/premium-media\/([\w.-]{1,120})$/.exec(String(b || ""));
      return x ? __vkb+"gc/pm/" + encodeURIComponent(x[1]) : null;
    };
    artUrl = (a) => /^\/api\/(music\/cover|yt\/img)\?/.test(String(a || "")) ? __vkb+"gc/art?p=" + encodeURIComponent(a) : null;
  }
});

function initChat({ el, pip, toast: toast2 }) {
  const S2 = {
    auth: ld(LS),
    up: false,
    mail: ld(LT2) && ld(LT2).ticket ? { mode: "signup", step: "name", email: ld(LT2).email, shown: ld(LT2).shown, ticket: ld(LT2).ticket, name: "", free: null, why: "", err: "" } : { mode: "", step: "", email: "", err: "" },
    view: "",
    shown: false,
    drawn: false,
    mode: "vella",
    friends: [],
    incoming: [],
    outgoing: [],
    reveal: null,
    inKey: "",
    owners: [],
    isOwner: false,
    ann: null,
    signups: true,
    ttOn: true,
    picsOn: true,
    own: { tab: "overview", stats: null, users: null, q: "", f: "all", n: 30, at: 0 },
    mine: { bio: "", color: null, reqs: true, joined: 0, pfp: null, pfpId: null },
    card: null,
    acct: { color: null, pfp: void 0, mail: { step: "", email: "", err: "" } },
    emojis: [],
    emap: new Map(),
    presets: [],
    gifSearch: false,
    pick: { tab: "e", q: "", gifs: null, loading: false },
    crop: null,
    cropFor: null,
    acp: null,
    tt: ld(LT),
    gc: { msgs: [], online: 0, emojis: new Map(), loaded: false, loading: false, sub: false },
    dms: {},
    typing: new Set(),
    typingT: {},
    reply: null,
    sending: false,
    draft: null
  };
  let ws = null, wsTimer = 0, backoff = 1e3, typingAt = 0, typingOff = 0, pend = 0, claiming = null;
  const $2 = (s) => el.querySelector(s);
  const me = () => S2.auth ? S2.auth.me : "";
  const peer = () => S2.view.startsWith("dm:") ? S2.view.slice(3) : null;
  const friend = (n) => S2.friends.find((f) => f.name === n);
  const home = () => S2.friends.length ? "dm:" + S2.friends[0].name : "friends";
  const wsend = (o) => {
    if (ws && ws.readyState === 1) ws.send(JSON.stringify(o));
  };
  async function api(path, body, opt = {}) {
    if (claiming && !opt.open) await claiming;
    const h2 = { "content-type": "application/json" };
    if (opt.tt && S2.tt) h2["x-tt"] = S2.tt.token;
    const r = await fetch(path, { method: body === void 0 ? "GET" : "POST", headers: h2, body: body === void 0 ? void 0 : JSON.stringify(body) });
    let d = null;
    try {
      d = await r.json();
    } catch {
    }
    if (r.status === 401 && opt.tt) ttGone();
    else if (r.status === 401 && !opt.open) signedOut();
    if (!r.ok) throw new Error(d && d.error || "Something went wrong. Try again.");
    return d;
  }
  const vCount = () => S2.friends.reduce((a, f) => a + (+f.unread || 0), 0) + S2.incoming.length;
  const vUnread = () => vCount() > 0;
  let askDone = null;
  function ask(title, yes) {
    if (askDone) askDone(false);
    el.insertAdjacentHTML("beforeend", `<div class="cfm" id="cfm" role="alertdialog" aria-label="${esc(title)}"><div class="cfm-b"><b>${esc(title)}</b><div class="cfm-a"><button type="button" class="ghost" data-cf="0">Cancel</button><button type="button" class="cfm-go" data-cf="1">${esc(yes)}</button></div></div></div>`);
    $2("#cfm .cfm-go").focus();
    return new Promise((r) => {
      askDone = (v) => {
        askDone = null;
        const d = $2("#cfm");
        if (d) d.remove();
        r(v);
      };
    });
  }
  const TT = initTT({
    el,
    $: $2,
    S: S2,
    toast: toast2,
    ask,
    conv: () => el.classList.add("mconv"),
    paintPics,
    wsend: (o) => wsend(o),
    api: (...a) => api(...a),
    showErr: (...a) => showErr(...a),
    renderNav: () => renderNav(),
    updatePip: () => updatePip(),
    loadOnline: () => loadOnline(),
    loadGc: () => loadGc(),
    ttGone: () => ttGone()
  });
  function updatePip() {
    pip.hidden = !S2.auth || !(vUnread() || TT.unread() > 0);
  }
  function setMode(m) {
    if (S2.mode === m) return;
    S2.mode = m;
    el.classList.remove("mconv");
    cardClose();
    viewClose();
    TT.closeAll();
    stopTyping();
    render();
    if (m === "tt" && S2.tt && !TT.loaded) TT.load();
  }
  let pickT = 0, pickSeq = 0;
  function pickPaint(free, why, name) {
    S2.mail = { ...S2.mail, free, why, name };
    const lab = el.querySelector("#authPick") && el.querySelector("#authPick").closest(".d-f2");
    const hint = el.querySelector(".d-hint");
    const go2 = el.querySelector("#mailAuth .go");
    if (lab) {
      lab.classList.toggle("ok", free === true);
      lab.classList.toggle("bad", free === false);
    }
    if (hint) {
      hint.textContent = why || (free ? name + " is free." : "");
      hint.classList.toggle("bad", free === false);
    }
    if (go2) go2.disabled = free === false;
  }
  function pickCheck(name) {
    clearTimeout(pickT);
    if (name.length < 4) return pickPaint(null, "", name);
    const n = ++pickSeq;
    pickT = setTimeout(async () => {
      try {
        const d = await api(__vkb+"api/c/signup/check", { email: S2.mail.email, ticket: S2.mail.ticket, name }, { open: true });
        if (n === pickSeq) pickPaint(!!d.free, d.why || "", name);
      } catch (er) {
        if (n === pickSeq) pickPaint(false, er.message, name);
      }
    }, 350);
  }
  async function sendAuthCode(email) {
    try {
      await api(__vkb+"api/c/email/code", { email, purpose: S2.mail.mode }, { open: true });
      S2.mail = { ...S2.mail, step: "code", email, err: "" };
      render();
      const c = $2("#authCode");
      if (c) c.focus();
    } catch (er) {
      S2.mail.err = er.message;
      render();
    }
  }
  let bounceT = 0;
  function syncBounce() {
    const on = !S2.auth && S2.mail.mode === "signup" && S2.mail.step === "code" && S2.mail.email;
    if (!on) {
      clearInterval(bounceT);
      bounceT = 0;
      return;
    }
    if (bounceT) return;
    const email = S2.mail.email;
    bounceT = setInterval(async () => {
      if (S2.auth || S2.mail.step !== "code" || S2.mail.email !== email) {
        clearInterval(bounceT);
        bounceT = 0;
        return;
      }
      try {
        const d = await api(__vkb+"api/c/signup/bounced?email=" + encodeURIComponent(email), void 0, { open: true });
        if (d && d.bounced && S2.mail.step === "code" && S2.mail.email === email) {
          clearInterval(bounceT);
          bounceT = 0;
          S2.mail = { ...S2.mail, err: "That email can’t receive our code. Tap “Use a different email” and try a personal one." };
          render();
        }
      } catch {
      }
    }, 5e3);
  }
  function render() {
    if (!S2.shown) return;
    S2.drawn = true;
    S2.card = null;
    S2.crop = null;
    S2.acp = null;
    el.classList.toggle("out", !S2.auth);
    if (!S2.auth) {
      el.innerHTML = S2.mail.mode ? mailAuthHTML(S2.mail) : authHTML(S2.up);
      paintPics(el);
      syncBounce();
      return;
    }
    el.innerHTML = '<nav class="cn" id="cn" aria-label="Conversations"></nav><section class="cp" id="cp"></section><button type="button" class="mback" data-mb aria-label="Back to chats">' + ic("back") + "</button>";
    renderNav();
    renderPane();
  }
  function renderNav() {
    updatePip();
    const n = $2("#cn");
    if (!n) return;
    const l = n.querySelector(".cn-l"), y = l ? l.scrollTop : 0, x = l ? l.scrollLeft : 0;
    if (S2.mode === "tt") {
      TT.nav(n, vCount());
      const l3 = n.querySelector(".cn-l");
      if (l3) {
        l3.scrollTop = y;
        l3.scrollLeft = x;
      }
      paintPics(n);
      return;
    }
    n.innerHTML = navHTML({ ttOn: S2.ttOn, ttUnread: TT.unread(), me: me(), view: S2.view, friends: S2.friends, incoming: S2.incoming, tt: !!S2.tt, typing: S2.typing, owners: S2.owners, isOwner: S2.isOwner, ann: S2.ann, mine: S2.mine });
    const l2 = n.querySelector(".cn-l");
    if (l2) {
      l2.scrollTop = y;
      l2.scrollLeft = x;
    }
    paintPics(n);
  }
  function renderPane() {
    if (S2.mode === "tt") {
      TT.pane($2("#cp"));
      annRefresh();
      return;
    }
    paneBody();
    annRefresh();
  }
  function annRefresh() {
    const p = $2("#cp");
    if (!p) return;
    const old = p.querySelector(".annb");
    if (old) old.remove();
    let gone = "";
    try {
      gone = localStorage.getItem("vella.annx") || "";
    } catch {
    }
    if (S2.view === "owner" || !S2.ann || S2.ann.id === gone) return;
    const ph = p.querySelector(".ph"), h2 = annHTML(S2.ann, S2.owners);
    if (ph) ph.insertAdjacentHTML("afterend", h2);
    else p.insertAdjacentHTML("afterbegin", h2);
  }
  function paneBody() {
    const p = $2("#cp");
    if (!p) return;
    S2.reply = null;
    const pn = peer();
    if (!S2.view) {
      p.innerHTML = "";
      return;
    }
    if (pn) {
      const f = friend(pn);
      if (!f) {
        S2.view = home();
        renderNav();
        return renderPane();
      }
      p.innerHTML = dmHeadHTML(f, S2.typing.has(pn), S2.owners) + '<div class="msgs" id="msgs"></div>' + composerHTML("Message " + pn, 500, S2.picsOn || S2.isOwner);
      paintPics(p);
      draftRender();
      if (S2.dms[pn] && S2.dms[pn].loaded) {
        renderDm("end");
        markRead(pn);
      } else loadDm(pn);
    } else if (S2.view === "account") {
      p.innerHTML = accountHTML({ name: me(), mine: S2.mine, owners: S2.owners, color: S2.acct.color ?? S2.mine.color, pfp: S2.acct.pfp === void 0 ? S2.mine.pfpId || null : S2.acct.pfp, presets: S2.presets, isOwner: S2.isOwner, mail: S2.acct.mail });
      paintPics(p);
    } else if (S2.view === "owner" && S2.isOwner) {
      p.innerHTML = ownerHTML({ ann: S2.ann, signups: S2.signups, owners: S2.owners, emojis: S2.emojis, presets: S2.presets, tt: S2.ttOn, pics: S2.picsOn, tab: S2.own.tab, stats: S2.own.stats, users: S2.own.users, q: S2.own.q, f: S2.own.f, n: S2.own.n });
      paintPics(p);
      if (S2.own.tab === "overview") ownStats();
      if (S2.own.tab === "users" || !S2.own.users) ownUsers();
    } else {
      p.innerHTML = friendsHTML();
      renderFriends(true);
    }
  }
  function paint2(html, mode) {
    const b = $2("#msgs");
    if (!b) return;
    const near = b.scrollHeight - b.scrollTop - b.clientHeight < 90;
    const fromBottom = b.scrollHeight - b.scrollTop;
    b.innerHTML = html;
    paintPics(b);
    if (mode === "end" || mode !== "top" && near) b.scrollTop = b.scrollHeight;
    else if (mode === "top") b.scrollTop = b.scrollHeight - fromBottom;
  }
  function renderDm(mode) {
    const pn = peer(), c = pn && S2.dms[pn], f = pn && friend(pn);
    if (!c || !f) return;
    paint2(dmRowsHTML(c.msgs, { me: me(), read: f.read || 0, typing: S2.typing.has(pn), more: c.more, peer: pn, emojis: S2.emap, you: { pfp: f.pfp, color: f.color }, mine: { pfp: S2.mine.pfp, color: S2.mine.color } }), mode);
  }
  function dmHead() {
    const pn = peer(), f = pn && friend(pn), s = $2("#dmSt");
    if (!f || !s) return;
    const ty = S2.typing.has(pn);
    s.className = ty ? "ty" : "";
    s.textContent = ty ? "typing…" : f.online ? "online" : "offline";
    const dot = $2(".ph .on-dot");
    if (f.online && !dot) $2(".ph .av").insertAdjacentHTML("beforeend", '<i class="on-dot"></i>');
    if (!f.online && dot) dot.remove();
  }
  function renderFriends(force) {
    if (S2.view !== "friends") return;
    const t = $2("#frTicket"), i = $2("#frIn"), o = $2("#frOut");
    if (!t) return;
    t.innerHTML = ticketHTML(S2.outgoing.find((x) => x.to === S2.reveal));
    const key = S2.incoming.map((r) => r.from).join(",");
    if (force || key !== S2.inKey) {
      i.innerHTML = incomingHTML(S2.incoming, S2.owners);
      S2.inKey = key;
    }
    o.innerHTML = outgoingHTML(S2.outgoing, S2.owners);
    paintPics(t.parentElement || document);
  }
  function renderReply() {
    const bar = $2("#rbar");
    if (!bar) return;
    const t = S2.reply && (S2.dms[peer()] || { msgs: [] }).msgs.find((m) => String(m.id) === String(S2.reply));
    if (!t) {
      bar.hidden = true;
      S2.reply = null;
      return;
    }
    bar.hidden = false;
    const who = t.from === me() ? "yourself" : t.from;
    bar.innerHTML = replyBarHTML(who, kindText(t));
  }
  function showErr(sel, msg) {
    const e = typeof sel === "string" ? $2(sel) : sel;
    if (!e) return;
    e.hidden = !msg;
    e.textContent = msg || "";
  }
  async function loadState() {
    if (!S2.auth) return;
    try {
      const d = await api(__vkb+"api/c/state");
      S2.auth.me = d.me;
      S2.friends = d.friends;
      S2.incoming = d.incoming;
      S2.outgoing = d.outgoing;
      if (d.mine) S2.mine = d.mine;
      S2.emojis = d.emojis || [];
      S2.emap = new Map(S2.emojis.map((e) => [e.name, e.url]));
      S2.presets = d.presets || [];
      S2.gifSearch = !!d.gifSearch;
      S2.owners = d.owners || [];
      S2.isOwner = !!d.isOwner;
      S2.ann = d.ann || null;
      S2.signups = d.signups !== false;
      if (S2.picsOn !== (d.pics !== false)) picsMode(d.pics !== false);
      if (S2.ttOn !== (d.tt !== false)) ttMode(d.tt !== false);
      if (!S2.view || S2.view === "owner" && !S2.isOwner || peer() && !friend(peer())) {
        S2.view = home();
        renderPane();
      }
      renderNav();
      renderFriends(false);
      dmHead();
      annRefresh();
    } catch {
      if (!S2.view) {
        S2.view = "friends";
        renderNav();
        renderPane();
      }
    }
  }
  async function loadOnline() {
    try {
      const d = await (await fetch(__vkb+"api/gc/online")).json();
      const st = $2("#cp .who .stack");
      if (st && Array.isArray(d.faces) && d.faces.length) st.innerHTML = d.faces.slice(0, 4).map((u) => av(String(u), { img: __vkb+"gc/pfp/" + encodeURIComponent(String(u)) })).join("");
      const el2 = $2("#gcCount"), n = Math.floor(+d.online || 0);
      if (!el2 || n < 1) return;
      el2.innerHTML = "<b>" + n + "</b> " + (n === 1 ? "person is" : "people are") + " here right now";
    } catch {
    }
  }
  async function loadGc() {
    if (!S2.tt || S2.gc.loading) return;
    S2.gc.loading = true;
    try {
      const d = await api(__vkb+"api/gc/messages", void 0, { tt: true });
      S2.gc.msgs = d.messages || [];
      S2.gc.online = d.online || 0;
      S2.gc.emojis = new Map((d.emojis || []).map((e) => [String(e.name).toLowerCase(), e.file]));
      S2.gc.loaded = true;
      renderNav();
    } catch {
    } finally {
      S2.gc.loading = false;
    }
  }
  async function loadDm(pn, older) {
    const c = S2.dms[pn] || (S2.dms[pn] = { msgs: [], loaded: false, more: false });
    const first = c.msgs.find((m) => !m.pend);
    try {
      const d = await api(__vkb+"api/c/dm/" + encodeURIComponent(pn) + (older && first ? "?before=" + first.id : ""));
      const f = friend(pn);
      if (f) f.read = d.read;
      if (older) c.msgs = d.msgs.concat(c.msgs);
      else {
        const pendings = c.msgs.filter((m) => m.pend);
        c.msgs = d.msgs.concat(pendings);
      }
      c.more = d.more;
      c.loaded = true;
      if (peer() === pn) {
        renderDm(older ? "top" : "end");
        markRead(pn);
      }
    } catch {
    }
  }
  function markRead(pn) {
    if (!S2.shown || peer() !== pn || document.hidden) return;
    const c = S2.dms[pn], f = friend(pn);
    if (!c || !f) return;
    const last = [...c.msgs].reverse().find((m) => !m.pend);
    if (!last) return;
    if (f.unread || last.from !== me() && (c.readSent || 0) < last.id) {
      c.readSent = last.id;
      f.unread = 0;
      renderNav();
      api(__vkb+"api/c/read", { name: pn, last: last.id }).catch(() => {
      });
    }
  }
  function gcSub() {
    const want = S2.shown && !!S2.tt && !!S2.auth && S2.ttOn;
    if (want && !S2.gc.sub) {
      S2.gc.sub = true;
      wsend({ t: "gc", tt: S2.tt.token });
      if (S2.gc.loaded) loadGc();
    } else if (!want && S2.gc.sub) {
      S2.gc.sub = false;
      wsend({ t: "gc-off" });
    }
  }
  async function ownStats() {
    S2.own.at = Date.now();
    try {
      S2.own.stats = await api(__vkb+"api/c/owner/stats");
      const b = $2("#oStats");
      if (b) b.innerHTML = ownStatsHTML(S2.own.stats);
    } catch {
    }
  }
  function ownUsersRender() {
    const b = $2("#oUsers");
    if (!b) return;
    b.innerHTML = ownUsersHTML({ users: S2.own.users, q: S2.own.q, f: S2.own.f, n: S2.own.n, owners: S2.owners });
    paintPics(b);
  }
  async function ownUsers() {
    try {
      const had = !!S2.own.users;
      S2.own.users = (await api(__vkb+"api/c/owner/users")).users;
      ownUsersRender();
      if (!had) {
        const e = $2('[data-act=owntab][data-t="users"]');
        if (e && !e.querySelector("em")) e.insertAdjacentHTML("beforeend", `<em>${S2.own.users.length}</em>`);
      }
    } catch {
    }
  }
  async function ownTt(on) {
    try {
      const d = await api(__vkb+"api/c/owner/tt", { on });
      ttMode(d.tt);
      toast2(d.tt ? "tungtung chat is on" : "tungtung chat is off");
    } catch (er) {
      toast2(er.message);
    }
  }
  function picsMode(on) {
    S2.picsOn = on;
    if (peer() || S2.view === "owner") renderPane();
  }
  async function ownPics(on) {
    try {
      const d = await api(__vkb+"api/c/owner/pics", { on });
      picsMode(d.pics);
      toast2(d.pics ? "Pictures are on" : "Pictures are owners only");
    } catch (er) {
      toast2(er.message);
    }
  }
  function ttMode(on) {
    S2.ttOn = on;
    if (!on) {
      S2.gc.sub = false;
      if (S2.mode === "tt") setMode("vella");
    }
    renderNav();
    if (S2.view === "owner") renderPane();
    gcSub();
  }
  function ttGone() {
    const had = !!S2.tt;
    TT.reset();
    S2.tt = null;
    sv(LT, null);
    S2.gc.loaded = false;
    S2.gc.msgs = [];
    if (S2.gc.sub) {
      S2.gc.sub = false;
      wsend({ t: "gc-off" });
    }
    if (had && S2.mode === "tt") renderPane();
    renderNav();
  }
  function signedOut() {
    TT.reset();
    S2.auth = null;
    sv(LS, null);
    clearTimeout(wsTimer);
    if (ws) {
      const w = ws;
      ws = null;
      w.onclose = null;
      w.close();
    }
    S2.friends = [];
    S2.incoming = [];
    S2.outgoing = [];
    S2.dms = {};
    S2.view = "";
    S2.gc.sub = false;
    updatePip();
    render();
  }
  function wsUrl() {
    if (!self.__vka) return (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/c/ws";
    let t = "";
    try {
      t = localStorage.getItem("vella.tok") || "";
    } catch {
    }
    return self.__vka.replace(/^http/, "ws") + "/c/ws?t=" + encodeURIComponent(t);
  }
  function connect() {
    if (!S2.auth || ws) return;
    ws = new WebSocket(wsUrl());
    ws.onmessage = (e) => {
      let d;
      try {
        d = JSON.parse(e.data);
      } catch {
        return;
      }
      onWs(d);
    };
    ws.onclose = () => {
      ws = null;
      S2.gc.sub = false;
      if (!S2.auth) return;
      clearTimeout(wsTimer);
      wsTimer = setTimeout(connect, backoff);
      backoff = Math.min(backoff * 2, 3e4);
    };
  }
  function onWs(d) {
    if (d.t === "ready") {
      backoff = 1e3;
      loadState();
      gcSub();
      const pn = peer();
      if (pn && S2.dms[pn] && S2.dms[pn].loaded) loadDm(pn);
    } else if (d.t === "ann") {
      S2.ann = d.ann;
      dispatchEvent(new CustomEvent("vl-ann"));
      renderNav();
      if (S2.view === "owner") renderPane();
      else annRefresh();
    } else if (d.t === "unauth") signedOut();
    else if (d.t === "unsent") markMsg(d.peer, d.id, { kind: "unsent", text: "", media: null, exp: null, r: {} });
    else if (d.t === "dmx") markMsg(d.peer, d.id, { media: null });
    else if (d.t === "pics") loadState().then(() => {
      if (S2.view === "owner") renderPane();
      else if (peer()) renderDm();
      pickRender();
    });
    else if (d.t === "state") {
      loadState();
      if (d.toast) toast2(d.toast);
    } else if (d.t === "dm") onDm(d.peer, d.msg);
    else if (d.t === "react") {
      const c = S2.dms[d.peer], m = c && c.msgs.find((x) => x.id === d.id);
      if (m) {
        m.r = d.r;
        if (peer() === d.peer) renderDm();
      }
    } else if (d.t === "seen") {
      const f = friend(d.from);
      if (f) {
        f.read = Math.max(f.read || 0, d.last);
        if (peer() === d.from) renderDm();
      }
    } else if (d.t === "read") {
      const f = friend(d.peer);
      if (f && f.unread) {
        f.unread = 0;
        renderNav();
      }
    } else if (d.t === "presence") {
      const f = friend(d.name);
      if (f) {
        f.online = d.online;
        renderNav();
        if (peer() === d.name) dmHead();
      }
    } else if (d.t === "typing") setTyping(d.from, d.on);
    else if (d.t === "gc-ok") {
      S2.gc.online = d.online || S2.gc.online;
    } else if (d.t === "gc-no") ttGone();
    else if (d.t === "gc-paused") S2.gc.sub = false;
    else if (d.t === "ttmode") ttMode(!!d.on);
    else if (d.t === "picsmode") picsMode(!!d.on);
    else if (d.t === "gc") {
      onGc(d.ev, d.data);
      TT.onPublic(d.ev, d.data);
    } else if (d.t === "tt") TT.onPrivate(d.ev, d.data);
  }
  function setTyping(n, on) {
    clearTimeout(S2.typingT[n]);
    if (on) {
      S2.typing.add(n);
      S2.typingT[n] = setTimeout(() => setTyping(n, false), 6e3);
    } else S2.typing.delete(n);
    renderNav();
    if (peer() === n) {
      renderDm();
      dmHead();
    }
  }
  function onDm(pn, msg) {
    const f = friend(pn);
    if (!f) {
      loadState();
      return;
    }
    const c = S2.dms[pn];
    if (c && c.loaded && !c.msgs.some((m) => m.id === msg.id)) {
      const i = c.msgs.findIndex((m) => m.pend && m.text === msg.text && msg.from === me());
      if (i > -1) c.msgs.splice(i, 1, msg);
      else c.msgs.push(msg);
    }
    f.last = { text: msg.text, kind: msg.kind, mine: msg.from === me(), time: msg.time };
    if (msg.from !== me()) {
      S2.typing.delete(pn);
      if (S2.shown && peer() === pn && !document.hidden) markRead(pn);
      else f.unread = (f.unread || 0) + 1;
    }
    S2.friends.sort((a, b) => (b.last && b.last.time || 0) - (a.last && a.last.time || 0));
    renderNav();
    if (peer() === pn) {
      renderDm(msg.from === me() ? "end" : void 0);
      dmHead();
      if (msg.from !== me()) markRead(pn);
    }
  }
  function onGc(ev, data) {
    if (!["msg", "edit", "del", "react", "online"].includes(ev)) return;
    const L = S2.gc.msgs;
    if (ev === "msg") {
      if (!L.some((m) => m.id === data.id)) {
        L.push(data);
        if (L.length > 300) L.splice(0, L.length - 300);
      }
    } else if (ev === "edit") {
      const m = L.find((x) => x.id === data.id);
      if (m) {
        m.text = data.text;
        m.editedAt = data.editedAt;
      }
    } else if (ev === "del") {
      const i = L.findIndex((x) => x.id === data.id);
      if (i > -1) L.splice(i, 1);
    } else if (ev === "react") {
      const m = L.find((x) => x.id === data.id);
      if (m) m.reactions = data.reactions;
    } else if (ev === "online") S2.gc.online = data;
  }
  async function sendMsg() {
    const i = $2("#msg");
    const text = i.value.trim(), d0 = S2.draft;
    if (!text && !d0 || S2.sending) return;
    if (d0 && !d0.id && !d0.gif) return showErr("#cerr", d0.err || "Still uploading…");
    const reply = S2.reply;
    showErr("#cerr", "");
    const pn = peer(), c = S2.dms[pn];
    if (!c) return;
    const target = reply && c.msgs.find((m) => String(m.id) === String(reply));
    const tmp = { id: "p" + ++pend, from: me(), text, time: Date.now(), pend: true, r: {}, kind: d0 ? d0.kind === "gif" ? "gif" : d0.kind : "text", media: d0 ? d0.url : null, w: d0 ? d0.w : null, h: d0 ? d0.h : null, reply: target ? { id: target.id, from: target.from, text: target.text, kind: target.kind } : null };
    c.msgs.push(tmp);
    S2.draft = null;
    i.value = "";
    draftRender();
    inputChanged(i);
    S2.reply = null;
    renderReply();
    stopTyping();
    renderDm("end");
    try {
      const d = await api(__vkb+"api/c/dm/" + encodeURIComponent(pn), { text, reply: target ? target.id : null, media: d0 && d0.id, gif: d0 && d0.gif, w: d0 && d0.w, h: d0 && d0.h });
      const k = c.msgs.indexOf(tmp);
      if (c.msgs.some((m) => m.id === d.msg.id)) {
        if (k > -1) c.msgs.splice(k, 1);
      } else if (k > -1) c.msgs.splice(k, 1, d.msg);
      renderDm("end");
    } catch (e) {
      const k = c.msgs.indexOf(tmp);
      if (k > -1) c.msgs.splice(k, 1);
      renderDm();
      if (d0) {
        S2.draft = d0;
        draftRender();
      }
      i.value = text;
      inputChanged(i);
      showErr("#cerr", e.message);
    }
  }
  function inputChanged(i) {
    const s = $2("#send");
    if (s) s.disabled = !i.value.trim() && !S2.draft;
  }
  function typed() {
    const pn = peer();
    if (!pn) return;
    const now = Date.now();
    if (now - typingAt > 2500) {
      typingAt = now;
      wsend({ t: "typing", to: pn, on: true });
    }
    clearTimeout(typingOff);
    typingOff = setTimeout(stopTyping, 4e3);
  }
  function stopTyping() {
    clearTimeout(typingOff);
    if (typingAt && peer()) wsend({ t: "typing", to: peer(), on: false });
    typingAt = 0;
  }
  async function react(id, emoji) {
    try {
      {
        const pn = peer(), c = S2.dms[pn], m = c && c.msgs.find((x) => String(x.id) === String(id));
        if (!m) return;
        const d = await api(__vkb+"api/c/react", { id: m.id, emoji });
        m.r = d.r;
        renderDm();
      }
    } catch (e) {
      toast2(e.message);
    }
  }
  async function accept(from) {
    const row2 = [...el.querySelectorAll(".req")].find((r) => r.dataset.from === from);
    if (!row2) return;
    const cells2 = [...row2.querySelectorAll("input.cell")];
    const code = cells2.map((c) => c.value).join("");
    const err = row2.querySelector(".ferr");
    if (code.length < 4) {
      row2.querySelector(".cells").classList.add("bad");
      return showErr(err, "Type all 4 characters of the code.");
    }
    try {
      await api(__vkb+"api/c/accept", { from, code });
      toast2("You and " + from + " are friends");
      await loadState();
      renderFriends(true);
    } catch (e) {
      row2.querySelector(".cells").classList.add("bad");
      showErr(err, e.message);
    }
  }
  async function request(to) {
    showErr("#addErr", "");
    try {
      const d = await api(__vkb+"api/c/request", { to });
      const had = S2.outgoing.find((x) => x.to === d.to && x.exp > Date.now());
      S2.outgoing = [d].concat(S2.outgoing.filter((x) => x.to !== d.to));
      S2.reveal = d.to;
      if (!had) toast2("Request sent to " + d.to);
      const i = $2("#addName");
      if (i) i.value = "";
      renderFriends(false);
    } catch (e) {
      showErr("#addErr", e.message);
    }
  }
  async function ownAnn(take) {
    const t = $2("#annT"), home2 = $2("[data-act=ownhome]");
    const text = take ? "" : t ? t.value.trim() : "";
    if (!take && !text) return toast2("Write something first");
    try {
      const d = await api(__vkb+"api/c/owner/ann", { text, home: !!home2 && home2.getAttribute("aria-checked") === "true" });
      S2.ann = d.ann;
      renderNav();
      renderPane();
      toast2(take ? "Announcement taken down" : "Posted to everyone");
    } catch (e) {
      toast2(e.message);
    }
  }
  async function ownSignups(open2) {
    try {
      const d = await api(__vkb+"api/c/owner/signups", { open: open2 });
      S2.signups = d.signups;
      renderPane();
      toast2(d.signups ? "Sign-ups are open" : "Sign-ups are closed");
    } catch (e) {
      toast2(e.message);
    }
  }
  function cardClose() {
    const c = $2("#pcard");
    if (c) c.remove();
    S2.card = null;
  }
  function cardRender() {
    if (!S2.card || !S2.card.p) return;
    const old = $2("#pcard"), html = cardHTML(S2.card.p, { owners: S2.owners });
    if (old) old.outerHTML = html;
    else el.insertAdjacentHTML("beforeend", html);
    const c = $2("#pcard"), a = $2(S2.card.sel);
    paintPics(c);
    if (!a) return;
    const r = a.getBoundingClientRect(), w = c.offsetWidth, h2 = c.offsetHeight;
    c.style.left = Math.max(8, Math.min(r.left, innerWidth - w - 8)) + "px";
    c.style.top = Math.max(8, Math.min(r.bottom + 8, innerHeight - h2 - 8)) + "px";
  }
  async function cardOpen(name, sel) {
    if (name === me()) return open("account");
    if (S2.card && S2.card.name === name) return cardClose();
    cardClose();
    S2.card = { name, sel, p: null };
    try {
      const p = await api(__vkb+"api/c/profile/" + encodeURIComponent(name));
      if (S2.card && S2.card.name === name) {
        S2.card.p = p;
        cardRender();
      }
    } catch (er) {
      cardClose();
      toast2(er.message);
    }
  }
  async function saveMine(body, msg) {
    try {
      const d = await api(__vkb+"api/c/me", body);
      S2.mine = { ...S2.mine, ...d };
      S2.acct = { color: null, pfp: void 0 };
      if (S2.view === "account") renderPane();
      renderNav();
      toast2(msg(d));
    } catch (er) {
      toast2(er.message);
    }
  }
  function markMsg(pn, id, patch) {
    const c = S2.dms[pn], m = c && c.msgs.find((x) => x.id === id);
    if (m) Object.assign(m, patch);
    const f = friend(pn), last = c && c.msgs[c.msgs.length - 1];
    if (f && m && last === m) {
      f.last = { ...f.last || {}, text: m.text, kind: m.kind };
      renderNav();
    }
    if (peer() === pn) renderDm();
    const v = $2("#viewer");
    if (v && S2.viewer === id) viewClose();
  }
  const bitmap = async (file) => {
    try {
      return await createImageBitmap(file, { imageOrientation: "from-image" });
    } catch {
      throw new Error("That picture couldn't be opened.");
    }
  };
  const toBlob = (c, qual) => new Promise((ok) => c.toBlob((b) => b && b.type === "image/webp" ? ok(b) : c.toBlob(ok, "image/jpeg", qual), "image/webp", qual));
  async function upload(url, blob) {
    if (claiming) await claiming;
    const r = await fetch(url, { method: "POST", headers: { "content-type": blob.type || "application/octet-stream" }, body: blob });
    let d = null;
    try {
      d = await r.json();
    } catch {
    }
    if (r.status === 401) signedOut();
    if (!r.ok) throw new Error(d && d.error || (r.status === 413 ? "That file is too big." : "Upload failed. Try again."));
    return d;
  }
  function draftRender() {
    const b = $2("#dbar");
    if (!b) return;
    b.innerHTML = draftHTML(S2.draft);
    b.hidden = !S2.draft;
    const i = $2("#msg");
    if (i) inputChanged(i);
  }
  function draftClear() {
    if (S2.draft && S2.draft.url.startsWith("blob:")) URL.revokeObjectURL(S2.draft.url);
    S2.draft = null;
    draftRender();
  }
  function xhrUpload(url, blob, onProg) {
    return new Promise((ok, no) => {
      const x = new XMLHttpRequest();
      x.open("POST", url);
      x.setRequestHeader("content-type", blob.type || "application/octet-stream");
      x.upload.onprogress = (e) => {
        if (e.lengthComputable) onProg(e.loaded / e.total * 100);
      };
      x.onload = () => {
        let d = null;
        try {
          d = JSON.parse(x.responseText);
        } catch {
        }
        if (x.status === 401) signedOut();
        if (x.status >= 200 && x.status < 300) ok(d);
        else no(new Error(d && d.error || (x.status === 413 ? "That file is too big." : "Upload failed. Try again.")));
      };
      x.onerror = () => no(new Error("Upload failed. Try again."));
      x.send(blob);
    });
  }
  async function stageFile(file) {
    if (!peer() || !file) return;
    showErr("#cerr", "");
    draftClear();
    try {
      const bm = await bitmap(file);
      let blob = file, w = bm.width, h2 = bm.height;
      if (file.type === "image/gif") {
        if (file.size > 8e6) throw new Error("GIFs can be up to 8 MB.");
      } else {
        const k = Math.min(1, 1600 / Math.max(w, h2));
        w = Math.round(w * k);
        h2 = Math.round(h2 * k);
        const c = document.createElement("canvas");
        c.width = w;
        c.height = h2;
        c.getContext("2d").drawImage(bm, 0, 0, w, h2);
        blob = await toBlob(c, 0.82);
      }
      const d = { kind: file.type === "image/gif" ? "gif" : "photo", url: URL.createObjectURL(blob), w, h: h2, up: 0, id: null, err: "" };
      S2.draft = d;
      draftRender();
      const r = await xhrUpload(__vkb+"api/c/upload?w=" + w + "&h=" + h2, blob, (p) => {
        if (S2.draft === d) {
          d.up = Math.min(99, p);
          draftRender();
        }
      });
      if (S2.draft !== d) return;
      d.id = r.id;
      d.up = 100;
      draftRender();
      const i = $2("#msg");
      if (i) i.focus();
    } catch (er) {
      if (S2.draft) {
        S2.draft.err = er.message;
        draftRender();
      } else showErr("#cerr", er.message);
    }
  }
  function pickRender() {
    const p = $2("#emop.pk");
    if (p) p.innerHTML = pickerHTML({ ...S2.pick, emojis: S2.emojis, gifSearch: S2.gifSearch });
  }
  function pickOpen(tab) {
    const p = $2("#emop.pk");
    if (!p) return;
    if (!p.hidden && S2.pick.tab === tab) {
      p.hidden = true;
      return;
    }
    S2.pick.tab = tab;
    pickRender();
    p.hidden = false;
    if (tab === "g" && S2.gifSearch) {
      if (!S2.pick.gifs) gifSearch("");
      const i = $2("#gifQ");
      if (i) i.focus();
    }
  }
  let gifT = 0;
  async function gifSearch(qy) {
    S2.pick.q = qy;
    S2.pick.loading = true;
    try {
      const d = await api(__vkb+"api/c/gifs?q=" + encodeURIComponent(qy));
      if (S2.pick.q === qy) S2.pick.gifs = d.gifs;
    } catch {
      if (S2.pick.q === qy) S2.pick.gifs = [];
    }
    S2.pick.loading = false;
    const g = $2("#gifG");
    if (g) g.innerHTML = gifGridHTML(S2.pick);
  }
  function pickGiphy(g) {
    if (!peer() || !g) return;
    const p = $2("#emop");
    if (p) p.hidden = true;
    draftClear();
    S2.draft = { kind: "giphy", url: g.thumb, gif: g.url, w: g.w, h: g.h, up: 100, id: null, err: "" };
    draftRender();
    const i = $2("#msg");
    if (i) i.focus();
  }
  function acpUpdate(i) {
    const box = $2("#acp");
    if (!box) return;
    const m = /(?:^|\s):([a-z0-9_]{2,24})$/i.exec(i.value.slice(0, i.selectionStart ?? i.value.length));
    const list2 = m ? S2.emojis.filter((e) => e.name.startsWith(m[1].toLowerCase())).slice(0, 6) : [];
    S2.acp = list2.length ? { list: list2, at: (i.selectionStart ?? i.value.length) - m[1].length - 1, k: 0 } : null;
    box.hidden = !S2.acp;
    if (S2.acp) box.innerHTML = acpHTML(list2, 0);
  }
  function acpPick(n) {
    const i = $2("#msg"), a = S2.acp;
    if (!i || !a || !a.list[n]) return;
    const end = i.selectionStart ?? i.value.length, ins = ":" + a.list[n].name + ": ";
    i.value = (i.value.slice(0, a.at) + ins + i.value.slice(end)).slice(0, i.maxLength);
    const pos = Math.min(i.value.length, a.at + ins.length);
    i.setSelectionRange(pos, pos);
    S2.acp = null;
    $2("#acp").hidden = true;
    inputChanged(i);
    i.focus();
  }
  function viewOpen(id) {
    const pn = peer(), c = S2.dms[pn], m = c && c.msgs.find((x) => String(x.id) === String(id));
    if (!m || !m.media) return;
    viewClose();
    const f = m.from === me() ? { color: S2.mine.color, pfp: S2.mine.pfp } : friend(m.from) || {};
    el.insertAdjacentHTML("beforeend", viewerHTML(m, { color: f.color, pfp: f.pfp, owners: S2.owners }));
    S2.viewer = m.id;
    paintPics($2("#viewer"));
  }
  function viewClose() {
    const v = $2("#viewer");
    if (v) v.remove();
    S2.viewer = null;
  }
  async function cropStart(file) {
    const f = S2.cropFor;
    if (!file || !f) return;
    try {
      const gif = file.type === "image/gif";
      if (gif && file.size > (f.type === "pfp" ? 4e6 : 2e6)) throw new Error("That GIF is too big.");
      const bm = await bitmap(file);
      cropClose();
      S2.crop = { ...f, file, gif, bm, z: 1, x: null, y: null };
      el.insertAdjacentHTML("beforeend", cropHTML({ title: f.type === "emoji" ? "Add emoji" : f.type === "preset" ? "Add picture" : "Your photo", ok: f.type === "emoji" ? "Add emoji" : f.type === "preset" ? "Add picture" : "Use photo", name: f.type === "emoji", gif }));
      cropDraw();
      const n = $2("#cropN");
      if (n) n.focus();
    } catch (er) {
      toast2(er.message);
    }
  }
  function cropDraw() {
    const c = $2("#cropC"), s = S2.crop;
    if (!c || !s) return;
    const W = c.width, k = Math.max(W / s.bm.width, W / s.bm.height) * s.z, dw = s.bm.width * k, dh = s.bm.height * k;
    if (s.x === null) {
      s.x = (W - dw) / 2;
      s.y = (W - dh) / 2;
    }
    s.x = Math.min(0, Math.max(W - dw, s.x));
    s.y = Math.min(0, Math.max(W - dh, s.y));
    s.dw = dw;
    s.dh = dh;
    const g = c.getContext("2d");
    g.clearRect(0, 0, W, W);
    g.drawImage(s.bm, s.x, s.y, dw, dh);
  }
  function cropZoom(z) {
    const c = $2("#cropC"), s = S2.crop;
    if (!c || !s) return;
    const W = c.width, cx = (W / 2 - s.x) / s.dw, cy = (W / 2 - s.y) / s.dh;
    s.z = z;
    const k = Math.max(W / s.bm.width, W / s.bm.height) * z;
    s.x = W / 2 - cx * s.bm.width * k;
    s.y = W / 2 - cy * s.bm.height * k;
    cropDraw();
  }
  function cropClose() {
    const d = $2("#crop");
    if (d) d.remove();
    S2.crop = null;
  }
  async function cropDone(btn) {
    const s = S2.crop;
    if (!s) return;
    btn.disabled = true;
    try {
      let blob = s.file;
      if (!s.gif) {
        const size = s.type === "emoji" ? 128 : 256, out = document.createElement("canvas");
        out.width = out.height = size;
        const g = out.getContext("2d");
        g.beginPath();
        g.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        g.clip();
        g.drawImage($2("#cropC"), 0, 0, size, size);
        blob = await toBlob(out, 0.9);
      }
      if (s.type === "emoji") {
        const name = $2("#cropN").value.trim().toLowerCase().replace(/^:+|:+$/g, "");
        const d = await upload(__vkb+"api/c/owner/emoji?name=" + encodeURIComponent(name), blob);
        S2.emojis = d.emojis;
        S2.emap = new Map(S2.emojis.map((e) => [e.name, e.url]));
        toast2(":" + name + ": added");
      } else if (s.type === "preset") {
        const d = await upload(__vkb+"api/c/owner/preset", blob);
        S2.presets = d.presets;
        toast2("Picture added");
      } else {
        const d = await upload(__vkb+"api/c/pfp", blob);
        S2.mine = { ...S2.mine, pfp: d.pfp, pfpId: d.pfpId };
        if (S2.card) S2.card.pfp = d.pfpId;
        toast2("Photo updated");
      }
      cropClose();
      if (S2.view === "owner") renderPane();
      renderNav();
      cardRender();
    } catch (er) {
      showErr("#cropErr", er.message);
      btn.disabled = false;
    }
  }
  async function ownDel(path, body, msg) {
    try {
      const d = await api(path, body);
      if (d.emojis) {
        S2.emojis = d.emojis;
        S2.emap = new Map(S2.emojis.map((e) => [e.name, e.url]));
      }
      if (d.presets) S2.presets = d.presets;
      renderPane();
      toast2(msg);
    } catch (er) {
      toast2(er.message);
    }
  }
  function pickFile(type) {
    S2.cropFor = { type };
    let i = $2("#upPick");
    if (!i) {
      el.insertAdjacentHTML("beforeend", '<input type="file" id="upPick" accept="image/png,image/jpeg,image/webp,image/gif" hidden>');
      i = $2("#upPick");
    }
    i.value = "";
    i.click();
  }
  function open(v) {
    el.classList.add("mconv");
    if (S2.view !== v) draftClear();
    if (S2.view === v) return;
    if (S2.view === "account") S2.acct = { color: null, pfp: void 0, mail: { step: "", email: "", err: "" } };
    cardClose();
    viewClose();
    stopTyping();
    S2.view = v;
    renderNav();
    renderPane();
  }
  el.addEventListener("click", async (e) => {
    if (askDone) {
      const cf = e.target.closest("[data-cf]");
      if (cf || !e.target.closest(".cfm-b")) askDone(!!cf && cf.dataset.cf === "1");
      return;
    }
    if (e.target.closest("[data-mlog]")) {
      el.classList.add("mconv");
      const u = $2("#ttUser");
      if (u) u.focus();
      return;
    }
    if (e.target.closest("[data-mb]")) {
      el.classList.remove("mconv");
      cardClose();
      TT.closeAll();
      return;
    }
    const cm = e.target.closest("[data-cmode]");
    if (cm) {
      setMode(cm.dataset.cmode === "tt" ? "tt" : "vella");
      return;
    }
    if (S2.mode === "tt" && S2.auth && TT.click(e)) return;
    if (S2.card && !e.target.closest("#pcard,[data-prof]")) cardClose();
    const pf = e.target.closest("[data-prof]");
    if (pf && !(pf.closest("#cn") && matchMedia("(max-width:720px)").matches)) {
      e.preventDefault();
      return cardOpen(pf.dataset.prof, pf.closest(".ph") ? ".ph [data-prof]" : '#cn [data-prof="' + CSS.escape(pf.dataset.prof) + '"]');
    }
    const v = e.target.closest("[data-v]");
    if (v) return open(v.dataset.v);
    const a = e.target.closest("[data-act]");
    const pop2 = $2("#emop");
    if (pop2 && !pop2.hidden && !e.target.closest("#emop,[data-act=emo],[data-act=gifs]")) pop2.hidden = true;
    if (S2.acp && !e.target.closest("#acp")) {
      S2.acp = null;
      const b = $2("#acp");
      if (b) b.hidden = true;
    }
    if (!a) return;
    const act = a.dataset.act;
    if (act === "mailmode") {
      S2.mail = { mode: a.dataset.m || "", step: "", email: "", err: "" };
      render();
      const f = $2(S2.mail.mode ? "#authMail" : "#authName");
      if (f) f.focus();
      return true;
    }
    if (act === "mailsend") {
      await sendAuthCode(S2.mail.email);
      return true;
    }
    if (act === "mode") {
      S2.up = a.dataset.m === "up";
      el.querySelectorAll("[data-act=mode]").forEach((b) => b.classList.toggle("on", b === a));
      const p = $2("#authPass");
      p.placeholder = S2.up ? "make a password" : "password";
      p.autocomplete = S2.up ? "new-password" : "current-password";
      $2("#dmeter").hidden = !S2.up;
      $2("#authForm .go").textContent = S2.up ? "Send code" : "Sign in";
      const alt = $2("#authForm .d-alt");
      if (alt) alt.hidden = S2.up;
      el.querySelectorAll("#authForm .d-mail").forEach((x) => {
        x.hidden = !S2.up;
      });
      el.querySelectorAll("#authForm .d-user").forEach((x) => {
        x.hidden = S2.up;
      });
      showErr("#authErr", "");
    } else if (act === "eye") {
      const p = a.parentElement.querySelector("input"), show = p.type === "password";
      p.type = show ? "text" : "password";
      a.innerHTML = ic(show ? "eyeoff" : "eye");
      a.setAttribute("aria-label", show ? "Hide password" : "Show password");
    } else if (act === "signout") {
      if (!await ask("Sign out everywhere?", "Sign out")) return;
      api(__vkb+"api/c/logout", {}).catch(() => {
      }).finally(signedOut);
    } else if (act === "pccolor") {
      S2.acct.color = +a.dataset.c;
      a.parentElement.querySelectorAll("button").forEach((b) => {
        const on = b === a;
        b.classList.toggle("on", on);
        b.setAttribute("aria-checked", on);
      });
    } else if (act === "pcsave") saveMine({ bio: $2("#pcBio").value, color: S2.acct.color ?? S2.mine.color, pfp: S2.acct.pfp === void 0 ? S2.mine.pfpId || null : S2.acct.pfp }, () => "Profile saved");
    else if (act === "pcreqs") saveMine({ reqs: a.dataset.r === "1" }, (d) => d.reqs ? "Anyone can send you friend requests" : "Friend requests are off");
    else if (act === "annx") {
      try {
        if (S2.ann) localStorage.setItem("vella.annx", S2.ann.id);
      } catch {
      }
      const b = $2(".annb");
      if (b) b.remove();
    } else if (act === "ownhome") a.setAttribute("aria-checked", a.getAttribute("aria-checked") === "true" ? "false" : "true");
    else if (act === "ownpost") ownAnn(false);
    else if (act === "owntake") {
      if (await ask("Take down the announcement?", "Take down")) ownAnn(true);
    } else if (act === "ownsu") ownSignups(a.dataset.su === "1");
    else if (act === "owntab") {
      S2.own.tab = a.dataset.t;
      renderPane();
    } else if (act === "ownf") {
      S2.own.f = a.dataset.f;
      S2.own.n = 30;
      ownUsersRender();
    } else if (act === "ownmore") {
      S2.own.n += 30;
      ownUsersRender();
    } else if (act === "ownview") cardOpen(a.dataset.n, `[data-ouser="${CSS.escape(a.dataset.n)}"] [data-act=ownview]`);
    else if (act === "ownpics") {
      if (S2.picsOn) {
        if (await ask("Turn off pictures for everyone else?", "Turn off")) ownPics(false);
      } else ownPics(true);
    } else if (act === "owntt") {
      if (S2.ttOn) {
        if (await ask("Turn off tungtung chat for everyone?", "Turn off")) ownTt(false);
      } else ownTt(true);
    } else if (act === "ttout") {
      if (await ask("Log out of tungtung?", "Log out")) ttGone();
    } else if (act === "react") react(a.dataset.id, a.dataset.e);
    else if (act === "reply") {
      S2.reply = a.dataset.id;
      renderReply();
      const m = $2("#msg");
      if (m) m.focus();
    } else if (act === "unreply") {
      S2.reply = null;
      renderReply();
    } else if (act === "emo") pickOpen("e");
    else if (act === "gifs") pickOpen("g");
    else if (act === "ptab") {
      S2.pick.tab = a.dataset.t;
      pickRender();
      if (S2.pick.tab === "g" && S2.gifSearch && !S2.pick.gifs) gifSearch("");
    } else if (act === "gifsend") pickGiphy((S2.pick.gifs || [])[+a.dataset.i]);
    else if (act === "dx") draftClear();
    else if (act === "gifup") {
      if (pop2) pop2.hidden = true;
      const i = $2("#pick");
      if (i) {
        i.accept = "image/gif";
        i.click();
      }
    } else if (act === "pickimg") {
      const i = $2("#pick");
      if (i) {
        i.accept = "image/png,image/jpeg,image/webp,image/gif";
        i.click();
      }
    } else if (act === "acp") acpPick(+a.dataset.n);
    else if (act === "view") viewOpen(a.dataset.id);
    else if (act === "vclose") viewClose();
    else if (act === "unsend") {
      const pn = peer(), id = +a.dataset.id;
      api(__vkb+"api/c/unsend", { id }).then(() => markMsg(pn, id, { kind: "unsent", text: "", media: null, exp: null, r: {} })).catch((er) => toast2(er.message));
    } else if (act === "pcpic") {
      S2.acct.pfp = a.dataset.f || null;
      renderPane();
    } else if (act === "mailedit") {
      S2.acct.mail = { step: "edit", email: "", err: "" };
      renderPane();
      const f = $2("#mailA");
      if (f) f.focus();
    } else if (act === "mailback") {
      S2.acct.mail = { step: "", email: "", err: "" };
      renderPane();
    } else if (act === "delopen") {
      S2.acct.mail = { step: "del", email: "", err: "" };
      renderPane();
      const f = $2("#delPw");
      if (f) f.focus();
    } else if (act === "mailrm") {
      if (!await ask("Remove your email? You'll lose password resets.", "Remove")) return;
      try {
        const d = await api(__vkb+"api/c/email/del", {});
        S2.mine.email = d.email;
        renderPane();
        toast2("Email removed");
      } catch (er) {
        toast2(er.message);
      }
    } else if (act === "restore") {
      try {
        await api(__vkb+"api/c/restore", {});
        S2.mine.deleted = null;
        renderPane();
        renderNav();
        toast2("Welcome back");
      } catch (er) {
        toast2(er.message);
      }
    } else if (act === "pcup") pickFile("pfp");
    else if (act === "ownem") pickFile("emoji");
    else if (act === "ownpr") pickFile("preset");
    else if (act === "ownemdel") {
      if (await ask("Delete :" + a.dataset.n + ":?", "Delete")) ownDel(__vkb+"api/c/owner/emoji/del", { name: a.dataset.n }, "Emoji deleted");
    } else if (act === "ownprdel") {
      if (await ask("Delete this picture?", "Delete")) ownDel(__vkb+"api/c/owner/preset/del", { id: a.dataset.f }, "Picture deleted");
    } else if (act === "cropx") cropClose();
    else if (act === "cropok") cropDone(a);
    else if (act === "ins") {
      const i = $2("#msg");
      const p = i.selectionStart ?? i.value.length;
      i.value = (i.value.slice(0, p) + a.dataset.e + i.value.slice(p)).slice(0, i.maxLength);
      inputChanged(i);
      i.focus();
      if (pop2) pop2.hidden = true;
    } else if (act === "older") {
      const pn = peer();
      if (pn) loadDm(pn, true);
    } else if (act === "accept") accept(a.dataset.from);
    else if (act === "decline") {
      if (!await ask("Decline " + a.dataset.from + "'s request?", "Decline")) return;
      api(__vkb+"api/c/decline", { from: a.dataset.from }).then(loadState).then(() => renderFriends(true)).catch((er) => toast2(er.message));
    } else if (act === "cancel") api(__vkb+"api/c/cancel", { to: a.dataset.to }).then(() => {
      if (S2.reveal === a.dataset.to) S2.reveal = null;
      return loadState();
    }).then(() => renderFriends(false)).catch((er) => toast2(er.message));
    else if (act === "resend") request(a.dataset.to);
  });
  el.addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = e.target;
    if (S2.mode === "tt" && S2.auth && await TT.submit(e)) return;
    if (f.id === "authForm") {
      const pass = $2("#authPass").value;
      const name = S2.up ? "" : $2("#authName").value.trim();
      const mail = S2.up ? $2("#authMailUp").value.trim() : "";
      const btn = f.querySelector(".go");
      btn.disabled = true;
      try {
        const d = await api(S2.up ? __vkb+"api/c/register" : __vkb+"api/c/login", S2.up ? { email: mail, pass } : { name, pass }, { open: true });
        if (d.pending) {
          S2.mail = { mode: "signup", step: "code", email: mail, shown: d.email, err: "" };
          render();
          const c = $2("#authCode");
          if (c) c.focus();
          return;
        }
        S2.auth = { me: d.me };
        sv(LS, S2.auth);
        S2.view = "";
        render();
        connect();
        loadState();
      } catch (er) {
        showErr("#authErr", er.message);
        btn.disabled = false;
      }
    } else if (f.id === "ttForm") {
      const username = $2("#ttUser").value.trim(), password = $2("#ttPass").value;
      const btn = f.querySelector(".go");
      btn.disabled = true;
      try {
        const d = await api(__vkb+"api/gc/login", { username, password }, { open: true });
        S2.tt = { token: d.token, username: d.username };
        sv(LT, S2.tt);
        renderNav();
        renderPane();
        gcSub();
      } catch (er) {
        showErr("#ttErr", er.message);
        btn.disabled = false;
      }
    } else if (f.id === "pcPass") {
      const btn = f.querySelector(".pc-go");
      btn.disabled = true;
      try {
        await api(__vkb+"api/c/password", { cur: $2("#pcCur").value, next: $2("#pcNew").value });
        renderPane();
        toast2("Password changed · other devices signed out");
      } catch (er) {
        showErr("#pcErr", er.message);
        btn.disabled = false;
      }
    } else if (f.id === "mailAuth") {
      const btn = f.querySelector(".go");
      if (S2.mail.step === "name") {
        btn.disabled = true;
        try {
          const d = await api(__vkb+"api/c/signup/name", { email: S2.mail.email, ticket: S2.mail.ticket, name: $2("#authPick").value.trim() }, { open: true });
          try {
            localStorage.removeItem(LT2);
          } catch {
          }
          S2.mail = { mode: "", step: "", email: "", err: "" };
          S2.auth = { me: d.me };
          sv(LS, S2.auth);
          S2.view = "";
          render();
          connect();
          loadState();
        } catch (er) {
          S2.mail = { ...S2.mail, free: false, why: er.message };
          render();
          const n = $2("#authPick");
          if (n) {
            n.focus();
            n.select();
          }
        }
        return;
      }
      if (S2.mail.step !== "code") return sendAuthCode($2("#authMail").value.trim());
      btn.disabled = true;
      try {
        const body = { email: S2.mail.email, purpose: S2.mail.mode, code: $2("#authCode").value.trim() };
        if (S2.mail.mode === "reset") body.next = $2("#authNew").value;
        const d = await api(__vkb+"api/c/email/verify", body, { open: true });
        if (d.ticket) {
          S2.mail = { mode: "signup", step: "name", email: S2.mail.email, shown: d.email, ticket: d.ticket, name: "", free: null, why: "", err: "" };
          try {
            localStorage.setItem(LT2, JSON.stringify({ email: S2.mail.email, shown: d.email, ticket: d.ticket }));
          } catch {
          }
          render();
          const n = $2("#authPick");
          if (n) n.focus();
          return;
        }
        S2.mail = { mode: "", step: "", email: "", err: "" };
        S2.auth = { me: d.me };
        sv(LS, S2.auth);
        S2.view = "";
        render();
        connect();
        loadState();
      } catch (er) {
        S2.mail.err = er.message;
        render();
        const c = $2("#authCode");
        if (c) c.focus();
      }
    } else if (f.id === "mailAdd") {
      const email = $2("#mailA").value.trim(), btn = f.querySelector(".pc-go");
      btn.disabled = true;
      try {
        await api(__vkb+"api/c/email/code", { email, purpose: "add" });
        S2.acct.mail = { step: "code", email, err: "" };
        renderPane();
        const c = $2("#mailC");
        if (c) c.focus();
      } catch (er) {
        S2.acct.mail.err = er.message;
        renderPane();
      }
    } else if (f.id === "mailCode") {
      const btn = f.querySelector(".pc-go");
      btn.disabled = true;
      try {
        const d = await api(__vkb+"api/c/email/verify", { email: S2.acct.mail.email, purpose: "add", code: $2("#mailC").value.trim() });
        S2.mine.email = d.email;
        S2.acct.mail = { step: "", email: "", err: "" };
        renderPane();
        toast2("Email confirmed");
      } catch (er) {
        S2.acct.mail.err = er.message;
        renderPane();
        const c = $2("#mailC");
        if (c) c.focus();
      }
    } else if (f.id === "delForm") {
      const btn = f.querySelector(".pc-go");
      btn.disabled = true;
      try {
        const d = await api(__vkb+"api/c/delete", { pass: $2("#delPw").value });
        S2.mine.deleted = d.deleted;
        S2.acct.mail = { step: "", email: "", err: "" };
        renderPane();
        renderNav();
        toast2("Account scheduled for deletion");
      } catch (er) {
        S2.acct.mail.err = er.message;
        renderPane();
      }
    } else if (f.id === "comp") sendMsg();
    else if (f.id === "addForm") request($2("#addName").value.trim());
  });
  el.addEventListener("input", (e) => {
    const t = e.target;
    if (S2.mode === "tt" && S2.auth && TT.input(e)) return;
    if (t.id === "mailC" || t.id === "authCode") t.value = t.value.replace(/\D/g, "").slice(0, 6);
    if (t.id === "authPick") {
      t.value = t.value.toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 12);
      pickCheck(t.value);
    }
    if (t.id === "msg") {
      inputChanged(t);
      if (t.value) typed();
      acpUpdate(t);
    } else if (t.id === "oQ") {
      S2.own.q = t.value;
      S2.own.n = 30;
      ownUsersRender();
    } else if (t.id === "gifQ") {
      clearTimeout(gifT);
      const v = t.value.trim();
      gifT = setTimeout(() => gifSearch(v), 350);
    } else if (t.id === "cropZ") cropZoom(+t.value);
    else if (t.id === "authPass" || t.id === "pcNew") {
      const v = t.value, n = Math.min(4, (v.length >= 6) + (v.length >= 10) + /[0-9]/.test(v) + /[^a-z0-9]/i.test(v));
      el.querySelectorAll(t.id === "pcNew" ? "#pcMeter i" : "#dmeter i").forEach((i, k) => i.classList.toggle("on", k < n));
    } else if (t.tagName === "INPUT" && t.classList.contains("cell")) {
      t.value = t.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
      t.closest(".cells").classList.remove("bad");
      showErr(t.closest(".req").querySelector(".ferr"), "");
      if (t.value && t.nextElementSibling) t.nextElementSibling.focus();
    }
  });
  el.addEventListener("keydown", (e) => {
    const t = e.target;
    if (askDone) {
      if (e.key === "Escape") {
        e.preventDefault();
        askDone(false);
      }
      return;
    }
    if (S2.mode === "tt" && S2.auth && TT.keydown(e)) return;
    if (t.tagName === "INPUT" && t.classList.contains("cell")) {
      if (e.key === "Backspace" && !t.value && t.previousElementSibling) t.previousElementSibling.focus();
      if (e.key === "Enter") {
        e.preventDefault();
        accept(t.closest(".req").dataset.from);
      }
    }
    if (S2.acp && t.id === "msg") {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        S2.acp.k = (S2.acp.k + (e.key === "ArrowDown" ? 1 : -1) + S2.acp.list.length) % S2.acp.list.length;
        $2("#acp").innerHTML = acpHTML(S2.acp.list, S2.acp.k);
        return;
      }
      if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        acpPick(S2.acp.k);
        return;
      }
      if (e.key === "Escape") {
        S2.acp = null;
        $2("#acp").hidden = true;
        return;
      }
    }
    if (e.key === "Enter" && t.id === "cropN") {
      e.preventDefault();
      const b = $2("[data-act=cropok]");
      if (b && !b.disabled) cropDone(b);
      return;
    }
    if (e.key === "Escape" && S2.crop) {
      cropClose();
      return;
    }
    if (e.key === "Escape" && $2("#viewer")) {
      viewClose();
      return;
    }
    if (e.key === "Escape" && S2.card) {
      cardClose();
      return;
    }
    if (e.key === "Escape" && S2.reply) {
      S2.reply = null;
      renderReply();
    }
  });
  el.addEventListener("paste", (e) => {
    const t = e.target;
    if (!(t.tagName === "INPUT" && t.classList.contains("cell"))) return;
    e.preventDefault();
    const v = (e.clipboardData.getData("text") || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4);
    const cells2 = [...t.closest(".cells").querySelectorAll("input")];
    cells2.forEach((c, i) => {
      c.value = v[i] || "";
    });
    cells2[Math.min(v.length, 3)].focus();
  });
  el.addEventListener("contextmenu", (e) => {
    if (e.target.closest(".av,.tt,.dpic,.viewer,.cem,.pk-g img,.own-emt,.own-prt,.pc-pg")) e.preventDefault();
  });
  el.addEventListener("dragstart", (e) => {
    if (e.target.closest(".av,.tt,.dpic,.viewer,.cem,.pk-g img,.own-emt,.own-prt,.pc-pg")) e.preventDefault();
  });
  el.addEventListener("change", (e) => {
    const t = e.target;
    if (t.id === "pick" && t.files[0]) {
      stageFile(t.files[0]);
      t.value = "";
    } else if (t.id === "upPick" && t.files[0]) {
      cropStart(t.files[0]);
      t.value = "";
    }
  });
  let drag = null;
  el.addEventListener("pointerdown", (e) => {
    const c = e.target.closest("#cropC");
    if (!c || !S2.crop || S2.crop.gif) return;
    drag = { x: e.clientX, y: e.clientY, k: c.width / c.getBoundingClientRect().width };
    c.setPointerCapture(e.pointerId);
  });
  el.addEventListener("pointermove", (e) => {
    if (!drag || !S2.crop) return;
    S2.crop.x += (e.clientX - drag.x) * drag.k;
    S2.crop.y += (e.clientY - drag.y) * drag.k;
    drag.x = e.clientX;
    drag.y = e.clientY;
    cropDraw();
  });
  el.addEventListener("pointerup", () => {
    drag = null;
  });
  el.addEventListener("pointercancel", () => {
    drag = null;
  });
  addEventListener("resize", () => {
    if (S2.card) cardClose();
  });
  document.addEventListener("visibilitychange", () => {
    const pn = peer();
    if (!document.hidden && pn) markRead(pn);
  });
  let tick = Date.now(), relAt = 0;
  setInterval(() => {
    const now = Date.now();
    if (S2.shown && S2.view === "owner" && S2.own.tab === "overview" && S2.isOwner && !document.hidden && now - S2.own.at > 5e3) ownStats();
    if (S2.shown && now - relAt > 2e4) {
      relAt = now;
      el.querySelectorAll("time[data-t]").forEach((t) => {
        t.textContent = rel(+t.dataset.t);
      });
    }
    if (S2.shown && S2.view === "friends") {
      el.querySelectorAll(".cd[data-exp]").forEach((c) => {
        const v = cd(+c.dataset.exp);
        c.textContent = v;
        c.classList.toggle("gone", v === "Expired");
      });
      if (S2.outgoing.some((o) => o.exp > tick && o.exp <= now)) renderFriends(false);
    }
    if (S2.shown) {
      el.querySelectorAll("[data-exp]").forEach((t) => {
        t.textContent = left(+t.dataset.exp);
      });
      el.querySelectorAll("[data-expl]").forEach((t) => {
        t.textContent = leftLong(+t.dataset.expl);
      });
    }
    if (S2.shown && S2.mode === "tt") TT.tick();
    tick = now;
  }, 1e3);
  if (S2.auth && S2.auth.tok) {
    claiming = fetch(__vkb+"api/c/claim", { method: "POST", headers: { authorization: "Bearer " + S2.auth.tok } }).then((r) => {
      if (r.status === 401) return signedOut();
      if (!r.ok) return;
      return r.json().then((d) => {
        S2.auth = { me: d.me };
        sv(LS, S2.auth);
        connect();
      });
    }).catch(() => {
    }).finally(() => {
      claiming = null;
    });
  } else if (S2.auth) connect();
  updatePip();
  return {
    me: () => me(),
    pfp: () => S2.mine.pfp || "",
    api: (path, body) => api(path, body),
    show(on) {
      if (on === S2.shown) return;
      S2.shown = on;
      if (on) {
        if (!S2.drawn) render();
        const pn = peer();
        if (pn) markRead(pn);
        if (S2.auth) {
          gcSub();
          loadState();
          if (S2.mode === "tt" && S2.tt && TT.loaded) TT.load();
        }
      } else {
        gcSub();
        stopTyping();
      }
    }
  };
}
var LS, LT, LT2, ld, sv;
var init_chat = __esm({
  "public/js/chat.js"() {
    init_chat_view();
    init_pic();
    init_tt();
    LS = "vella.chat";
    LT = "vella.tt";
    LT2 = "vella.signup";
    ld = (k) => {
      try {
        return JSON.parse(localStorage.getItem(k) || "null");
      } catch {
        return null;
      }
    };
    sv = (k, v) => {
      try {
        v == null ? localStorage.removeItem(k) : localStorage.setItem(k, JSON.stringify(v));
      } catch {
      }
    };
  }
});

function paint(code, lang) {
  if (!RULES[lang]) return esc3(code);
  const re = rx3(lang), kinds = RULES[lang].map(([k]) => k);
  let out = "", at = 0, m;
  while (m = re.exec(code)) {
    if (m[0] === "") {
      re.lastIndex++;
      continue;
    }
    let k = "";
    for (let i = 0; i < kinds.length; i++) if (m[i + 1] !== void 0) {
      k = kinds[i];
      break;
    }
    out += esc3(code.slice(at, m.index)) + `<span class="t-${k}">${esc3(m[0])}</span>`;
    at = m.index + m[0].length;
  }
  return out + esc3(code.slice(at));
}
function inline(t) {
  const code = [];
  let s = String(t).replace(/`([^`\n]+)`/g, (m, c) => {
    code.push(c);
    return "\0" + (code.length - 1) + "\0";
  });
  s = esc3(s).replace(/!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/g, (m, a, u) => `<img class="ai-md-img" src="${u}" alt="${a}" loading="lazy">`).replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (m, a, u) => `<a data-ai="link" data-u="${u}">${a}</a>`).replace(/(^|[\s(])((?:https?:\/\/)[^\s<)]+)/g, (m, p, u) => `${p}<a data-ai="link" data-u="${u}">${u}</a>`).replace(/\*\*\*([^*\n]+)\*\*\*/g, "<b><i>$1</i></b>").replace(/\*\*([^*\n]+)\*\*/g, "<b>$1</b>").replace(/(^|[^\w*])\*([^*\n]+)\*/g, "$1<i>$2</i>").replace(/(^|[^\w_])__([^_\n]+)__/g, "$1<b>$2</b>").replace(/(^|[^\w_])_([^_\n]+)_/g, "$1<i>$2</i>").replace(/~~([^~\n]+)~~/g, "<s>$1</s>");
  return s.replace(/\u0000(\d+)\u0000/g, (m, i) => `<code>${esc3(code[+i])}</code>`);
}
function list(lines, i) {
  const base = ITEM.exec(lines[i])[1].length, ord = !!ITEM.exec(lines[i])[3];
  const items = [];
  while (i < lines.length) {
    const m = ITEM.exec(lines[i]);
    if (m && m[1].length <= base) {
      if (items.length && m[1].length < base) break;
      items.push([m[4]]);
      i++;
      continue;
    }
    if (!items.length) break;
    if (!lines[i].trim()) {
      if (i + 1 < lines.length && (ITEM.test(lines[i + 1]) || /^\s{2,}\S/.test(lines[i + 1]))) {
        items[items.length - 1].push("");
        i++;
        continue;
      }
      break;
    }
    if (m || /^\s{2,}\S/.test(lines[i])) {
      items[items.length - 1].push(lines[i].replace(new RegExp("^\\s{0," + (base + 2) + "}"), ""));
      i++;
      continue;
    }
    break;
  }
  const tag = ord ? "ol" : "ul";
  return [`<${tag}>${items.map((b) => `<li>${blocks(b.join("\n")).replace(/^<p>([\s\S]*?)<\/p>/, "$1")}</li>`).join("")}</${tag}>`, i];
}
function blocks(src) {
  const lines = String(src ?? "").replace(/\r\n?/g, "\n").split("\n");
  let out = "", i = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) {
      i++;
      continue;
    }
    const f = FENCE.exec(l);
    if (f) {
      const body = [];
      i++;
      while (i < lines.length && !FENCE.test(lines[i])) body.push(lines[i++]);
      i++;
      out += codeHTML(body.join("\n"), f[1]);
      continue;
    }
    if (RULE.test(l) && !ITEM.test(l)) {
      out += "<hr>";
      i++;
      continue;
    }
    const h2 = HEAD.exec(l);
    if (h2) {
      const n = Math.min(6, h2[1].length);
      out += `<h${n}>${inline(h2[2])}</h${n}>`;
      i++;
      continue;
    }
    if (QUOTE.test(l)) {
      const body = [];
      while (i < lines.length && (QUOTE.test(lines[i]) || lines[i].trim() && body.length)) body.push(lines[i++].replace(QUOTE, ""));
      out += `<blockquote>${blocks(body.join("\n"))}</blockquote>`;
      continue;
    }
    if (l.includes("|") && i + 1 < lines.length && /^\s*\|?[\s:|-]*-[\s:|-]*$/.test(lines[i + 1]) && lines[i + 1].includes("-")) {
      const head = cells(l);
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].includes("|") && lines[i].trim()) rows.push(cells(lines[i++]));
      out += `<div class="ai-tw"><table><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
      continue;
    }
    if (ITEM.test(l)) {
      const [html, n] = list(lines, i);
      out += html;
      i = n;
      continue;
    }
    const p = [];
    while (i < lines.length && lines[i].trim() && !starts(lines[i])) p.push(lines[i++]);
    if (!p.length) {
      out += `<p>${inline(lines[i++])}</p>`;
      continue;
    }
    out += `<p>${inline(p.join("\n")).replace(/\n/g, "<br>")}</p>`;
  }
  return out;
}
function withMath(src, store) {
  const out = [];
  let run = [], fence = false;
  const flush = () => {
    if (run.length) {
      out.push(mathText(run.join("\n"), store));
      run = [];
    }
  };
  for (const l of String(src).split("\n")) {
    if (FENCE.test(l)) {
      if (!fence) flush();
      fence = !fence;
      out.push(l);
      continue;
    }
    if (fence) out.push(l);
    else run.push(l);
  }
  flush();
  return out.join("\n");
}
function renderMath(root) {
  if (!root || !root.querySelector(".mx:not([data-ok])")) return;
  loadKatex().then((k) => {
    for (const el of root.querySelectorAll(".mx:not([data-ok])")) {
      try {
        k.render(el.dataset.tex, el, { displayMode: el.classList.contains("md"), throwOnError: false, strict: false, output: "html" });
      } catch {
        el.textContent = el.dataset.tex;
      }
      el.dataset.ok = "1";
    }
  }).catch(() => {
    for (const el of root.querySelectorAll(".mx:not([data-ok])")) {
      el.textContent = el.dataset.tex;
      el.dataset.ok = "1";
    }
  });
}
var esc3, LANG, NAME, RULES, RX, rx3, codeHTML, FENCE, RULE, HEAD, ITEM, QUOTE, starts, cells, tidy, DISPLAY, INLINE, mathText, MD, kx, loadKatex, plain;
var init_md = __esm({
  "public/js/md.js"() {
    esc3 = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
    LANG = { js: "js", javascript: "js", jsx: "js", mjs: "js", ts: "js", typescript: "js", tsx: "js", css: "css", scss: "css", less: "css", html: "html", xml: "html", svg: "html", vue: "html", json: "json", py: "py", python: "py", sh: "sh", bash: "sh", zsh: "sh", shell: "sh", sql: "sql" };
    NAME = { js: "JavaScript", css: "CSS", html: "HTML", json: "JSON", py: "Python", sh: "Shell", sql: "SQL" };
    RULES = {
      js: [
        ["c", /\/\/[^\n]*|\/\*[\s\S]*?\*\//],
        ["s", /`(?:\\[\s\S]|[^`\\])*`|"(?:\\[\s\S]|[^"\\\n])*"|'(?:\\[\s\S]|[^'\\\n])*'/],
        ["k", /\b(?:const|let|var|function|return|if|else|for|while|do|class|extends|new|await|async|import|export|from|as|of|in|typeof|instanceof|try|catch|finally|throw|switch|case|break|continue|default|delete|void|yield|static|get|set)\b/],
        ["a", /\b(?:true|false|null|undefined|NaN|this|super)\b/],
        ["f", /[A-Za-z_$][\w$]*(?=\s*\()/],
        ["n", /\b\d[\d_]*(?:\.\d+)?(?:e[+-]?\d+)?\b/]
      ],
      css: [
        ["c", /\/\*[\s\S]*?\*\//],
        ["s", /"(?:\\[\s\S]|[^"\\\n])*"|'(?:\\[\s\S]|[^'\\\n])*'/],
        ["k", /@[-\w]+/],
        ["n", /#[0-9a-fA-F]{3,8}\b|\b\d*\.?\d+(?:px|em|rem|%|s|ms|vh|vw|vmin|vmax|deg|fr|ch|pt)?\b/],
        ["f", /[.#&][-\w]+|::?[-\w]+(?:\([^)]*\))?|\[[^\]]*\]/],
        ["p", /[-\w]+(?=\s*:)/]
      ],
      html: [
        ["c", /<!--[\s\S]*?-->/],
        ["s", /"(?:[^"\\\n]|\\[\s\S])*"|'(?:[^'\\\n]|\\[\s\S])*'/],
        ["k", /<\/?[A-Za-z][-\w]*|\/?>/],
        ["p", /[-\w:]+(?==)/]
      ],
      json: [
        ["p", /"(?:\\[\s\S]|[^"\\])*"(?=\s*:)/],
        ["s", /"(?:\\[\s\S]|[^"\\])*"/],
        ["a", /\b(?:true|false|null)\b/],
        ["n", /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/]
      ],
      py: [
        ["c", /#[^\n]*/],
        ["s", /"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\[\s\S]|[^"\\\n])*"|'(?:\\[\s\S]|[^'\\\n])*'/],
        ["k", /\b(?:def|class|return|if|elif|else|for|while|import|from|as|try|except|finally|raise|with|lambda|pass|break|continue|global|nonlocal|yield|assert|del|and|or|not|in|is|async|await)\b/],
        ["a", /\b(?:True|False|None|self)\b/],
        ["f", /[A-Za-z_]\w*(?=\s*\()/],
        ["n", /\b\d[\d_]*(?:\.\d+)?\b/]
      ],
      sh: [
        ["c", /#[^\n]*/],
        ["s", /"(?:\\[\s\S]|[^"\\])*"|'[^']*'/],
        ["k", /\b(?:if|then|else|elif|fi|for|while|do|done|case|esac|function|return|export|local|source|echo|cd|sudo|npm|node|git|curl|pm2)\b/],
        ["p", /\$\{?[\w@#?]+\}?/],
        ["n", /\b\d+\b/]
      ],
      sql: [
        ["c", /--[^\n]*|\/\*[\s\S]*?\*\//],
        ["s", /'(?:''|[^'])*'/],
        ["k", /\b(?:SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|INDEX|DROP|ALTER|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AS|AND|OR|NOT|NULL|ORDER|GROUP|BY|LIMIT|OFFSET|PRIMARY|KEY|FOREIGN|REFERENCES|DEFAULT|UNIQUE)\b/i],
        ["n", /\b\d+(?:\.\d+)?\b/]
      ]
    };
    RX = {};
    rx3 = (l) => {
      if (!RX[l]) RX[l] = new RegExp(RULES[l].map(([, r]) => "(" + r.source + ")").join("|"), "g");
      RX[l].lastIndex = 0;
      return RX[l];
    };
    codeHTML = (body, tag) => {
      const lang = LANG[String(tag || "").toLowerCase()] || "";
      return `<div class="cblk"><div class="chd"><span>${esc3(lang ? NAME[lang] : tag || "Code")}</span><button type="button" data-ai="copy">Copy</button></div><pre><code>${paint(body, lang)}</code></pre></div>`;
    };
    FENCE = /^\s*(?:```|~~~)\s*(\S*)\s*$/;
    RULE = /^\s*(?:---+|\*\*\*+|___+)\s*$/;
    HEAD = /^(#{1,6})\s+(.*)$/;
    ITEM = /^(\s*)(?:([-*+])|(\d+)[.)])\s+(.*)$/;
    QUOTE = /^\s*>\s?/;
    starts = (l) => FENCE.test(l) || RULE.test(l) || HEAD.test(l) || ITEM.test(l) || QUOTE.test(l);
    cells = (l) => l.replace(/^\s*\|/, "").replace(/\|\s*$/, "").split("|").map((c) => c.trim());
    tidy = (t) => String(t || "").replace(/<remember>[\s\S]*?<\/remember>/gi, "").replace(/<followups>[\s\S]*?<\/followups>/gi, "").replace(/<(?:remember|followups)>[\s\S]*$/i, "").replace(/<\/?[a-z]{0,9}$/i, "").trimEnd();
    DISPLAY = /\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]/g;
    INLINE = /\\\(([\s\S]+?)\\\)|(?<![\\$\w])\$(?![\s$])([^$\n]+?)(?<!\s)\$(?![\d$])/g;
    mathText = (t, store) => t.split(/(`[^`\n]+`)/).map((seg2, i) => i % 2 ? seg2 : seg2.replace(DISPLAY, (m, a, b) => {
      store.push({ tex: a ?? b, d: 1 });
      return "" + (store.length - 1) + "";
    }).replace(INLINE, (m, a, b) => {
      store.push({ tex: a ?? b, d: 0 });
      return "" + (store.length - 1) + "";
    })).join("");
    MD = (src) => {
      const store = [];
      const html = blocks(withMath(tidy(src), store));
      return store.length ? html.replace(/\u0003(\d+)\u0003/g, (m, i) => {
        const x = store[+i];
        return x ? '<span class="mx' + (x.d ? " md" : "") + '" data-tex="' + esc3(x.tex) + '"></span>' : "";
      }) : html;
    };
    kx = null;
    loadKatex = () => kx || (kx = new Promise((ok, no) => {
      if (window.katex) return ok(window.katex);
      const l = document.createElement("link");
      l.rel = "stylesheet";
      l.href = __vkb+"katex/katex.min.css";
      document.head.appendChild(l);
      const sc = document.createElement("script");
      sc.src = __vkb+"katex/katex.min.js";
      sc.onload = () => ok(window.katex);
      sc.onerror = () => {
        kx = null;
        no(new Error("katex"));
      };
      document.head.appendChild(sc);
    }));
    plain = (t) => tidy(t).replace(/```[\s\S]*?```/g, " ").replace(/`([^`]+)`/g, "$1").replace(/\$\$?([^$]+)\$\$?/g, "$1").replace(/!\[[^\]]*\]\([^)]*\)/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/\[\d+\]/g, "").replace(/[*_#>~|]/g, "").replace(/\s+/g, " ").trim();
  }
});

function initAi(ctx) {
  const { page: page2, toast: toast2 } = ctx;
  page2.addEventListener("error", (e) => {
    const t = e.target;
    if (t.tagName === "IMG" && t.closest(".ai-favs,.ai-srcl")) t.remove();
  }, true);
  const S2 = {
    chats: [],
    id: null,
    msgs: [],
    sending: false,
    loaded: false,
    eyes: false,
    mem: 0,
    memList: null,
    memOpen: false,
    memSure: false,
    shot: null,
    doc: null,
    draft: "",
    web: false,
    q: "",
    edit: null,
    rowMenu: null,
    renaming: null,
    rec: null,
    speak: -1,
    ctrl: null,
    live: -1
  };
  const $2 = (s) => page2.querySelector(s);
  function html() {
    return `<div class="ai">
<nav class="ai-side">
<div class="ai-top"><span class="sign">ai</span><button type="button" class="ai-new" data-ai="new" aria-label="New chat">${ic3("plus")}</button></div>
<label class="ai-find">${ic3("search")}<input id="aiFind" placeholder="Search chats" autocomplete="off" spellcheck="false" aria-label="Search chats" value="${esc4(S2.q)}"></label>
<div class="ai-list" id="aiList">${listHTML()}</div>
<button type="button" class="ai-memb" data-ai="mem" id="aiMemB">${memBtnHTML()}</button>
</nav>
<section class="ai-main">
<div class="ai-hd"><button type="button" class="ai-back" data-ai="side" aria-label="Chats">${ic3("chat")}</button><b id="aiTitle">${esc4(title())}</b></div>
<div class="ai-msgs" id="aiMsgs">${msgsHTML()}</div>
<form class="ai-comp" id="aiForm" autocomplete="off"><div class="cerr" id="aiErr" hidden></div><div class="ashot" id="aiShot" hidden></div>
<div class="cbox" id="aiBox"><button type="button" class="ib" data-ai="attach" aria-label="Attach a picture">${ic3("clip")}</button><input type="file" id="aiFile" accept="${acceptTypes()}" hidden><button type="button" class="ib${S2.web ? " on" : ""}" data-ai="web" id="aiWeb" aria-label="Search the web" aria-pressed="${S2.web}">${ic3("globe")}</button><div class="ai-recw" id="aiRecW" hidden><i class="ai-dot"></i><span id="aiRecT">0:00</span></div><input id="aiQ" placeholder="Ask anything" maxlength="4000" autocomplete="off" aria-label="Ask anything" value="${esc4(S2.draft)}"><button type="button" class="ib" data-ai="mic" id="aiMic" aria-label="Talk">${ic3("mic")}</button><button class="send" id="aiSend" aria-label="Send"${canSend() ? "" : " disabled"}>${ic3("send")}</button></div></form>
<div class="ai-mem" id="aiMem" hidden></div>
</section></div>`;
  }
  const title = () => (S2.chats.find((c) => c.id === S2.id) || {}).title || "New chat";
  const acceptTypes = () => "image/png,image/jpeg,image/webp";
  const canSend = () => !!(S2.draft.trim() || S2.shot && S2.shot.id || S2.doc);
  const memBtnHTML = () => `<span class="ai-hrt">${ic3("heart")}</span><span><b>Twin remembers</b> ${S2.mem ? S2.mem + (S2.mem === 1 ? " thing" : " things") : "nothing yet"}</span>`;
  function listHTML() {
    const q = S2.q.trim().toLowerCase();
    const list2 = q ? S2.chats.filter((c) => c.title.toLowerCase().includes(q)) : S2.chats;
    if (!S2.chats.length) return `<div class="ai-none">No chats yet</div>`;
    if (!list2.length) return `<div class="ai-none">Nothing matches</div>`;
    const pinned = list2.filter((c) => c.pinned), rest = list2.filter((c) => !c.pinned);
    const rowH = (c) => {
      if (S2.renaming === c.id) return `<div class="ai-row on"><input class="ai-ren" id="aiRen" value="${esc4(c.title)}" maxlength="60" aria-label="Chat name"></div>`;
      return `<div class="ai-row${c.id === S2.id ? " on" : ""}"><button type="button" data-ai="open" data-id="${c.id}">${c.pinned ? `<span class="ai-pin">${ic3("pin")}</span>` : ""}<span>${esc4(c.title)}</span></button><button type="button" class="ai-x" data-ai="rowmenu" data-id="${c.id}" aria-label="Chat options">${ic3("dots")}</button>${S2.rowMenu === c.id ? `<div class="ai-rmenu"><button type="button" data-ai="ren" data-id="${c.id}">${ic3("pen")}Rename</button><button type="button" data-ai="pinc" data-id="${c.id}">${ic3("pin")}${c.pinned ? "Unpin" : "Pin"}</button><button type="button" class="bad" data-ai="del" data-id="${c.id}">${ic3("trash")}Delete</button></div>` : ""}</div>`;
    };
    return (pinned.length ? `<div class="ai-gl">Pinned</div>${pinned.map(rowH).join("")}${rest.length ? `<div class="ai-gl">Recent</div>` : ""}` : "") + rest.map(rowH).join("");
  }
  const closeMenus = () => {
    if (S2.rowMenu !== null) {
      S2.rowMenu = null;
      paintList();
    }
  };
  const favs = (srcs) => srcs.slice(0, 4).map((s) => `<img src=__vkb+"icon?d=${esc4(s.host)}" alt="" draggable="false">`).join("");
  function srcHTML(m, i) {
    if (m.searching) return `<div class="ai-srch busy"><i class="ai-spin"></i>Searching the web…</div>`;
    const src = m.meta && m.meta.sources || [];
    if (!src.length) return "";
    return `<button type="button" class="ai-srch" data-ai="srcs" data-mi="${i}" aria-expanded="${!!m.srcOpen}"><span class="ai-favs">${favs(src)}</span>Searched ${src.length} site${src.length === 1 ? "" : "s"}${ic3("chev")}</button>${m.srcOpen ? `<div class="ai-srcl">${src.map((s, n) => `<a data-ai="link" data-u="${esc4(s.url)}"><b>${n + 1}</b><img src=__vkb+"icon?d=${esc4(s.host)}" alt="" draggable="false"><span>${esc4(s.title || s.host)}</span></a>`).join("")}</div>` : ""}`;
  }
  const lastBot = () => {
    for (let i = S2.msgs.length - 1; i >= 0; i--) if (S2.msgs[i].role === "assistant") return i;
    return -1;
  };
  function row2(m, i) {
    if (m.role === "user") {
      const pfp2 = ctx.pfp();
      if (S2.edit === i) return `<div class="ai-row-m me" data-mi="${i}"><div class="ai-col"><div class="ai-edit"><textarea id="aiEditT" rows="3" maxlength="4000" aria-label="Edit message">${esc4(m.text)}</textarea><div><button type="button" class="ai-eb" data-ai="editx">Cancel</button><button type="button" class="ai-eb go" data-ai="editok">Send</button></div></div></div></div>`;
      const shot = m.img ? `<img class="ai-shot" src="${esc4(m.img.startsWith("blob:") ? m.img : __vkb+"api/c/ai/img/" + m.img)}" alt="" draggable="false">` : "";
      const doc = m.doc ? `<div class="ai-docc"><i>PDF</i><span>${esc4(m.doc.n)}</span><small>${m.doc.p} page${m.doc.p === 1 ? "" : "s"}</small></div>` : "";
      return `<div class="ai-row-m me" data-mi="${i}">${pfp2 ? `<span class="ai-av"><img src="${esc4(pfp2)}" alt="" draggable="false"></span>` : ""}<div class="ai-col"><div class="ai-bub">${shot}${doc}${esc4(m.text)}</div>${!S2.sending && m.id ? `<div class="ai-acts"><button type="button" data-ai="edit" data-mi="${i}" aria-label="Edit">${ic3("pen")}</button></div>` : ""}</div></div>`;
    }
    const streaming = S2.sending && i === S2.live;
    const body = m.text ? MD(m.text) : streaming && !m.searching ? `<span class="ai-typing"><i></i><i></i><i></i></span>` : "";
    const acts3 = !streaming && m.text ? `<div class="ai-acts"><button type="button" data-ai="copyall" data-mi="${i}" aria-label="Copy">${ic3("copy")}</button><button type="button" data-ai="speak" data-mi="${i}" aria-label="${S2.speak === i ? "Stop reading" : "Read aloud"}"${S2.speak === i ? ' class="on"' : ""}>${ic3(S2.speak === i ? "stopsq" : "speak")}</button>${i === lastBot() && !S2.sending ? `<button type="button" data-ai="regen" aria-label="Try again">${ic3("reload")}</button>` : ""}${m.meta && m.meta.stopped ? `<span class="ai-note">Stopped</span>` : ""}</div>` : "";
    const fu = !streaming && !S2.sending && i === lastBot() && m.meta && m.meta.followups && m.meta.followups.length ? `<div class="ai-fu">${m.meta.followups.map((f) => `<button type="button" data-ai="fu">${ic3("spark")}<span>${esc4(f)}</span></button>`).join("")}</div>` : "";
    return `<div class="ai-row-m" data-mi="${i}"><div class="ai-col">${srcHTML(m, i)}${body ? `<div class="ai-bub">${body}</div>` : ""}${acts3}${fu}</div></div>`;
  }
  const msgsHTML = () => S2.msgs.length ? S2.msgs.map(row2).join("") : `<div class="ai-empty"><div class="sign">hey twin</div><p>Homework, ideas, quick answers.</p><div class="ai-chips">${CHIPS.map((c) => `<button type="button" data-ai="chip">${esc4(c)}</button>`).join("")}</div></div>`;
  function paint2(end) {
    const b = $2("#aiMsgs");
    if (!b) return;
    const near = b.scrollHeight - b.scrollTop - b.clientHeight < 120;
    b.innerHTML = msgsHTML();
    renderMath(b);
    if (end || near) b.scrollTop = b.scrollHeight;
  }
  function paintRow(i) {
    const b = $2("#aiMsgs"), el = b && b.querySelector(`.ai-row-m[data-mi="${i}"]`);
    if (!el) return paint2();
    const near = b.scrollHeight - b.scrollTop - b.clientHeight < 140;
    el.outerHTML = row2(S2.msgs[i], i);
    renderMath(b.querySelector(`.ai-row-m[data-mi="${i}"]`));
    if (near) b.scrollTop = b.scrollHeight;
  }
  function paintList() {
    const l = $2("#aiList");
    if (l) l.innerHTML = listHTML();
    const t = $2("#aiTitle");
    if (t) t.textContent = title();
    const r = $2("#aiRen");
    if (r) {
      r.focus();
      r.select();
    }
  }
  function paintMemBtn() {
    const b = $2("#aiMemB");
    if (b) b.innerHTML = memBtnHTML();
  }
  function paintComposer() {
    const sb = $2("#aiSend"), w = $2("#aiWeb"), f = $2("#aiFile");
    if (sb) {
      sb.innerHTML = ic3(S2.sending ? "stopsq" : "send");
      sb.setAttribute("aria-label", S2.sending ? "Stop" : "Send");
      sb.classList.toggle("stop", S2.sending);
      sb.disabled = !S2.sending && !canSend();
    }
    if (w) {
      w.classList.toggle("on", S2.web);
      w.setAttribute("aria-pressed", String(S2.web));
    }
    if (f) f.accept = acceptTypes();
  }
  async function load3() {
    try {
      const d = await ctx.api(__vkb+"api/c/ai");
      S2.chats = d.chats || [];
      S2.loaded = true;
      S2.eyes = !!d.eyes;
      S2.mem = d.mem || 0;
      paintList();
      paintMemBtn();
      paintComposer();
    } catch (er) {
      toast2(er.message);
    }
  }
  async function openChat2(id) {
    stopSpeak();
    S2.id = id;
    S2.edit = null;
    S2.rowMenu = null;
    try {
      const d = await ctx.api(__vkb+"api/c/ai/" + id);
      S2.msgs = (d.msgs || []).map((m) => ({ id: m.id, role: m.role, text: m.text, img: m.img || null, doc: m.doc || null, meta: m.meta || null }));
      paint2(true);
      paintList();
    } catch (er) {
      toast2(er.message);
    }
    page2.querySelector(".ai").classList.remove("side");
  }
  function newChat() {
    stopSpeak();
    S2.id = null;
    S2.msgs = [];
    S2.edit = null;
    paint2(true);
    paintList();
    const i = $2("#aiQ");
    if (i) i.focus();
    page2.querySelector(".ai").classList.remove("side");
  }
  async function del(id) {
    try {
      const d = await ctx.api(__vkb+"api/c/ai/del", { id });
      S2.chats = d.chats || [];
      S2.rowMenu = null;
      if (S2.id === id) {
        S2.id = null;
        S2.msgs = [];
        paint2(true);
      }
      paintList();
    } catch (er) {
      toast2(er.message);
    }
  }
  async function pinChat(id) {
    const c = S2.chats.find((x) => x.id === id);
    try {
      const d = await ctx.api(__vkb+"api/c/ai/pin", { id, pinned: !(c && c.pinned) });
      S2.chats = d.chats || S2.chats;
      S2.rowMenu = null;
      paintList();
    } catch (er) {
      toast2(er.message);
    }
  }
  async function renameChat(id, t) {
    S2.renaming = null;
    const c = S2.chats.find((x) => x.id === id);
    const v = String(t || "").replace(/\s+/g, " ").trim();
    if (!c || !v || v === c.title) return paintList();
    try {
      const d = await ctx.api(__vkb+"api/c/ai/rename", { id, title: v });
      S2.chats = d.chats || S2.chats;
    } catch (er) {
      toast2(er.message);
    }
    paintList();
  }
  async function copyText(txt, btn) {
    let ok = false;
    try {
      await navigator.clipboard.writeText(txt);
      ok = true;
    } catch {
    }
    if (!ok) {
      const a = document.createElement("textarea");
      a.value = txt;
      a.style.cssText = "position:fixed;top:-2000px;opacity:0";
      document.body.appendChild(a);
      a.select();
      try {
        ok = document.execCommand("copy");
      } catch {
      }
      a.remove();
    }
    if (btn) {
      btn.classList.add("ok");
      setTimeout(() => btn.classList.remove("ok"), 1400);
    }
    return ok;
  }
  async function copyCode(btn) {
    const c = btn.closest(".cblk"), t = c && c.querySelector("code");
    if (!t) return;
    const ok = await copyText(t.innerText);
    btn.textContent = ok ? "Copied" : "Ctrl+C";
    setTimeout(() => {
      btn.textContent = "Copy";
    }, 1600);
  }
  function stopSpeak() {
    try {
      speechSynthesis.cancel();
    } catch {
    }
    if (S2.speak !== -1) {
      const i = S2.speak;
      S2.speak = -1;
      if (S2.msgs[i]) paintRow(i);
    }
  }
  function speak(i) {
    if (!("speechSynthesis" in window)) return toast2("Reading aloud isn't supported here.");
    if (S2.speak === i) return stopSpeak();
    stopSpeak();
    const text = plain(S2.msgs[i].text).slice(0, 6e3);
    if (!text) return;
    const u = new SpeechSynthesisUtterance(text);
    const vs = speechSynthesis.getVoices();
    const v = vs.find((x) => /en[-_](US|GB)/i.test(x.lang) && /female|samantha|zira|google us english|aria|jenny/i.test(x.name)) || vs.find((x) => /^en/i.test(x.lang));
    if (v) u.voice = v;
    u.rate = 1.03;
    u.onend = u.onerror = () => {
      if (S2.speak === i) {
        S2.speak = -1;
        if (S2.msgs[i]) paintRow(i);
      }
    };
    S2.speak = i;
    paintRow(i);
    speechSynthesis.speak(u);
  }
  function err(msg) {
    const e = $2("#aiErr");
    if (!e) return;
    e.hidden = !msg;
    e.textContent = msg || "";
  }
  function stageRender() {
    const b = $2("#aiShot");
    if (!b) return;
    if (S2.doc) {
      b.hidden = false;
      b.innerHTML = `<span class="ai-pdfi">PDF</span><span>${esc4(S2.doc.n)} · ${S2.doc.p} page${S2.doc.p === 1 ? "" : "s"}${S2.doc.cut ? " · first part only" : ""}</span><button type="button" class="ib" data-ai="shotx" aria-label="Remove">${ic3("x")}</button>`;
    } else if (S2.shot) {
      b.hidden = false;
      b.innerHTML = `<img src="${esc4(S2.shot.url)}" alt="" draggable="false"><span>${S2.shot.id ? "Picture ready" : S2.shot.err || "Uploading…"}</span><button type="button" class="ib" data-ai="shotx" aria-label="Remove">${ic3("x")}</button>`;
    } else if (S2.docBusy) {
      b.hidden = false;
      b.innerHTML = `<span class="ai-pdfi">PDF</span><span>Reading ${esc4(S2.docBusy)}…</span>`;
    } else {
      b.hidden = true;
      b.innerHTML = "";
    }
    paintComposer();
  }
  function stageClear() {
    if (S2.shot && S2.shot.url.startsWith("blob:")) URL.revokeObjectURL(S2.shot.url);
    S2.shot = null;
    S2.doc = null;
    S2.docBusy = null;
    stageRender();
  }
  async function stageShot(file) {
    stageClear();
    try {
      const bm = await createImageBitmap(file, { imageOrientation: "from-image" });
      const k = Math.min(1, 1024 / Math.max(bm.width, bm.height));
      const c = document.createElement("canvas");
      c.width = Math.round(bm.width * k);
      c.height = Math.round(bm.height * k);
      c.getContext("2d").drawImage(bm, 0, 0, c.width, c.height);
      const blob = await new Promise((ok) => c.toBlob(ok, "image/jpeg", 0.85));
      const shot = { url: URL.createObjectURL(blob), id: null, err: "" };
      S2.shot = shot;
      stageRender();
      const r = await fetch(__vkb+"api/c/ai/img", { method: "POST", headers: { "content-type": blob.type }, body: blob });
      const d = await r.json().catch(() => null);
      if (!r.ok) throw new Error(d && d.error || "That picture didn't upload.");
      if (S2.shot !== shot) return;
      shot.id = d.id;
      stageRender();
    } catch (e) {
      if (S2.shot) {
        S2.shot.err = e.message;
        stageRender();
      } else err(e.message);
    }
  }
  function onFile(file) {
    if (!file) return;
    err("");
    if (/^image\//.test(file.type)) {
      if (!S2.eyes) return err("I can't look at pictures yet.");
      return stageShot(file);
    }
    err("Pictures only.");
  }
  async function recStart() {
    if (S2.rec) return;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder) return err("Voice isn't supported in this browser.");
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      return err("Allow the microphone to talk to twin.");
    }
    const type = ["audio/webm;codecs=opus", "audio/webm", "audio/ogg;codecs=opus", "audio/mp4"].find((t) => MediaRecorder.isTypeSupported(t)) || "";
    const rec = new MediaRecorder(stream, type ? { mimeType: type } : void 0);
    const chunks = [];
    rec.ondataavailable = (e) => {
      if (e.data && e.data.size) chunks.push(e.data);
    };
    rec.onstop = async () => {
      stream.getTracks().forEach((t) => t.stop());
      const blob = new Blob(chunks, { type: rec.mimeType || type || "audio/webm" });
      recUi(false, true);
      if (blob.size < 1200) {
        recUi(false);
        return;
      }
      try {
        const r = await fetch(__vkb+"api/c/ai/voice", { method: "POST", headers: { "content-type": blob.type }, body: blob });
        const d = await r.json().catch(() => null);
        if (!r.ok) throw new Error(d && d.error || "Couldn't hear that.");
        const i = $2("#aiQ");
        if (i && d.text) {
          i.value = (i.value.trim() ? i.value.trim() + " " : "") + d.text;
          S2.draft = i.value;
          i.focus();
        }
        paintComposer();
      } catch (e) {
        err(e.message);
      }
      recUi(false);
    };
    const t0 = Date.now();
    S2.rec = { rec, t0, timer: setInterval(() => {
      const s = Math.floor((Date.now() - t0) / 1e3), el = $2("#aiRecT");
      if (el) el.textContent = Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
      if (s >= 60) recStop();
    }, 250) };
    rec.start();
    recUi(true);
  }
  function recStop() {
    if (!S2.rec) return;
    clearInterval(S2.rec.timer);
    const r = S2.rec.rec;
    S2.rec = null;
    try {
      r.stop();
    } catch {
    }
  }
  function recUi(on, busy) {
    const w = $2("#aiRecW"), q = $2("#aiQ"), m = $2("#aiMic"), f = $2("#aiForm");
    if (f) f.classList.toggle("rec", !!on);
    if (w) w.hidden = !on;
    if (q) q.hidden = !!on;
    if (m) {
      m.classList.toggle("on", !!on);
      m.innerHTML = ic3(on ? "stopsq" : busy ? "spark" : "mic");
      m.setAttribute("aria-label", on ? "Stop recording" : "Talk");
      m.disabled = !!busy;
    }
    if (on) {
      const t = $2("#aiRecT");
      if (t) t.textContent = "0:00";
    }
  }
  async function memOpen() {
    S2.memOpen = true;
    S2.memSure = false;
    const box = $2("#aiMem");
    if (!box) return;
    box.hidden = false;
    box.innerHTML = `<div class="ai-memc"><div class="ai-memh"><b>What twin remembers</b><button type="button" class="ib" data-ai="memx" aria-label="Close">${ic3("x")}</button></div><div class="ai-meml">Loading…</div></div>`;
    try {
      const d = await ctx.api(__vkb+"api/c/ai/mem");
      S2.memList = d.mem || [];
    } catch {
      S2.memList = [];
    }
    memPaint();
  }
  function memPaint() {
    const l = page2.querySelector(".ai-meml"), c = page2.querySelector(".ai-memc");
    if (!l || !c) return;
    const list2 = S2.memList || [];
    l.innerHTML = list2.length ? list2.map((m) => `<div class="ai-memr"><span>${esc4(m.text)}</span><button type="button" class="ib" data-ai="memdel" data-id="${m.id}" aria-label="Forget this">${ic3("x")}</button></div>`).join("") : `<p class="ai-memn">Nothing yet. Tell twin your name, your year or what you're into and it'll remember.</p>`;
    const old = c.querySelector(".ai-memf");
    if (old) old.remove();
    if (list2.length) c.insertAdjacentHTML("beforeend", `<button type="button" class="ai-memf${S2.memSure ? " sure" : ""}" data-ai="memall">${S2.memSure ? "Tap again to forget everything" : "Forget everything"}</button>`);
  }
  function memClose() {
    S2.memOpen = false;
    const b = $2("#aiMem");
    if (b) {
      b.hidden = true;
      b.innerHTML = "";
    }
  }
  async function memDel(id, all) {
    try {
      const d = await ctx.api(__vkb+"api/c/ai/mem/del", all ? { all: true } : { id });
      S2.memList = d.mem || [];
      S2.mem = S2.memList.length;
      S2.memSure = false;
      memPaint();
      paintMemBtn();
    } catch (er) {
      toast2(er.message);
    }
  }
  async function run(body, userText, opts = {}) {
    S2.sending = true;
    err("");
    stopSpeak();
    const out = { role: "assistant", text: "", meta: null, searching: false };
    S2.msgs.push(out);
    S2.live = S2.msgs.length - 1;
    paint2(true);
    paintComposer();
    const ctrl = new AbortController();
    S2.ctrl = ctrl;
    try {
      const r = await fetch(__vkb+"api/c/ai/send", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body), signal: ctrl.signal });
      if (!r.ok || !r.body) {
        let d = null;
        try {
          d = await r.json();
        } catch {
        }
        throw new Error(d && d.error || "The AI didn't answer.");
      }
      const rd = r.body.getReader(), dec = new TextDecoder();
      let buf = "", ev = "";
      for (; ; ) {
        const { done, value } = await rd.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() || "";
        for (const line of lines) {
          if (line.startsWith("event:")) {
            ev = line.slice(6).trim();
            continue;
          }
          if (!line.startsWith("data:")) continue;
          let d = null;
          try {
            d = JSON.parse(line.slice(5).trim());
          } catch {
            continue;
          }
          const e = ev;
          ev = "";
          if (e === "start") {
            S2.id = d.id;
            const u = S2.msgs[S2.live - 1];
            if (u && u.role === "user") u.id = d.user;
            if (!S2.chats.some((c) => c.id === d.id)) {
              S2.chats.unshift({ id: d.id, title: d.title, pinned: 0 });
              paintList();
            }
            continue;
          }
          if (e === "search") {
            out.searching = true;
            paintRow(S2.live);
            continue;
          }
          if (e === "src") {
            out.searching = false;
            out.meta = { ...out.meta || {}, sources: d.sources || [] };
            paintRow(S2.live);
            continue;
          }
          if (e === "fail") throw new Error(d.error || "The AI didn't answer.");
          if (e === "done") {
            out.id = d.id;
            out.text = tidy(out.text);
            out.meta = { ...out.meta || {}, followups: d.followups || [], model: d.model };
            if (typeof d.mem === "number") S2.mem = d.mem;
            S2.chats = d.chats || S2.chats;
            if (d.remembered) toast2("Twin will remember that 💜");
            continue;
          }
          if (d.t) {
            out.text += d.t;
            paintRow(S2.live);
          }
        }
      }
      if (!out.text) S2.msgs.splice(S2.live, 1);
    } catch (e) {
      if (ctrl.signal.aborted) {
        out.text = tidy(out.text);
        out.meta = { ...out.meta || {}, stopped: true };
        out.searching = false;
        if (!out.text) S2.msgs.splice(S2.live, 1);
      } else {
        S2.msgs.splice(S2.live, 1);
        if (opts.onFail) opts.onFail();
        err(e.message);
      }
    } finally {
      S2.sending = false;
      S2.ctrl = null;
      S2.live = -1;
      paint2(true);
      paintList();
      paintMemBtn();
      paintComposer();
      const inp = $2("#aiQ");
      if (inp && !S2.rec) inp.focus();
    }
  }
  async function send(text) {
    if (S2.sending) return;
    const shot = S2.shot, doc = S2.doc;
    if (shot && !shot.id) return err(shot.err || "The picture is still uploading…");
    if (S2.docBusy) return err("Still reading the PDF…");
    if (!text.trim() && !shot && !doc) return;
    S2.msgs.push({ role: "user", text, img: shot ? shot.url : null, doc: doc ? { n: doc.n, p: doc.p } : null });
    S2.draft = "";
    const i = $2("#aiQ");
    if (i) i.value = "";
    S2.shot = null;
    S2.doc = null;
    stageRender();
    const web = S2.web;
    S2.web = false;
    await run({ text, id: S2.id, img: shot ? shot.id : null, doc: doc ? { n: doc.n, p: doc.p, t: doc.t } : null, search: web ? "force" : "auto" });
  }
  async function regen() {
    if (S2.sending || !S2.id) return;
    const i = lastBot();
    if (i < 0) return;
    S2.msgs.splice(i, 1);
    await run({ id: S2.id, regen: true, search: "auto" });
  }
  async function editSend() {
    const i = S2.edit, t = $2("#aiEditT");
    if (i === null || !t || S2.sending) return;
    const text = t.value.trim();
    const m = S2.msgs[i];
    if (!text || !m || !m.id) return;
    S2.edit = null;
    S2.msgs = S2.msgs.slice(0, i);
    S2.msgs.push({ ...m, text });
    await run({ id: S2.id, edit: m.id, text, search: "auto" });
  }
  function useText(t) {
    const i = $2("#aiQ");
    if (!i) return;
    i.value = t;
    S2.draft = t;
    paintComposer();
    i.focus();
  }
  return {
    html,
    mounted() {
      paint2(true);
      stageRender();
      if (!S2.loaded) load3();
      else {
        paintList();
        paintMemBtn();
      }
      if (S2.memOpen) memOpen();
    },
    click(e) {
      if (!e.target.closest(".ai-rmenu") && !e.target.closest("[data-ai='rowmenu']")) closeMenus();
      if (S2.memOpen && e.target.id === "aiMem") {
        memClose();
        return true;
      }
      const a = e.target.closest("[data-ai]");
      if (!a) return false;
      const k = a.dataset.ai, id = +a.dataset.id, i = +a.dataset.mi;
      if (k === "new") newChat();
      else if (k === "open") {
        if (S2.renaming === null) openChat2(id);
      } else if (k === "rowmenu") {
        S2.rowMenu = S2.rowMenu === id ? null : id;
        paintList();
      } else if (k === "ren") {
        S2.rowMenu = null;
        S2.renaming = id;
        paintList();
      } else if (k === "pinc") pinChat(id);
      else if (k === "del") del(id);
      else if (k === "side") page2.querySelector(".ai").classList.toggle("side");
      else if (k === "attach") {
        const f = $2("#aiFile");
        if (f) {
          f.value = "";
          f.click();
        }
      } else if (k === "web") {
        S2.web = !S2.web;
        paintComposer();
      } else if (k === "mic") {
        if (S2.rec) recStop();
        else recStart();
      } else if (k === "shotx") {
        stageClear();
        err("");
      } else if (k === "copy") copyCode(a);
      else if (k === "copyall") {
        const m = S2.msgs[i];
        if (m) copyText(tidy(m.text), a);
      } else if (k === "speak") speak(i);
      else if (k === "regen") regen();
      else if (k === "edit") {
        if (!S2.sending) {
          S2.edit = i;
          paint2();
          const t = $2("#aiEditT");
          if (t) {
            t.focus();
            t.setSelectionRange(t.value.length, t.value.length);
          }
        }
      } else if (k === "editx") {
        S2.edit = null;
        paint2();
      } else if (k === "editok") editSend();
      else if (k === "srcs") {
        const m = S2.msgs[i];
        if (m) {
          m.srcOpen = !m.srcOpen;
          paintRow(i);
        }
      } else if (k === "link") ctx.open(a.dataset.u);
      else if (k === "chip") useText(a.textContent.trim());
      else if (k === "fu") {
        if (!S2.sending) send(a.textContent.trim());
      } else if (k === "mem") memOpen();
      else if (k === "memx") memClose();
      else if (k === "memdel") memDel(id);
      else if (k === "memall") {
        if (S2.memSure) memDel(0, true);
        else {
          S2.memSure = true;
          memPaint();
        }
      }
      return true;
    },
    input(e) {
      if (e.target.id === "aiFind") {
        S2.q = e.target.value;
        paintList();
        return true;
      }
      if (e.target.id !== "aiQ") return false;
      S2.draft = e.target.value;
      paintComposer();
      return true;
    },
    change(e) {
      if (e.target.id !== "aiFile") return false;
      if (e.target.files && e.target.files[0]) onFile(e.target.files[0]);
      return true;
    },
    keydown(e) {
      if (e.target.id === "aiRen") {
        if (e.key === "Enter") {
          e.preventDefault();
          renameChat(S2.renaming, e.target.value);
        } else if (e.key === "Escape") {
          S2.renaming = null;
          paintList();
        }
        return true;
      }
      if (e.target.id === "aiEditT") {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          editSend();
        } else if (e.key === "Escape") {
          S2.edit = null;
          paint2();
        }
        return true;
      }
      return false;
    },
    focusout(e) {
      if (e.target.id === "aiRen" && S2.renaming !== null) renameChat(S2.renaming, e.target.value);
    },
    paste(e) {
      if (e.target.id !== "aiQ") return false;
      const f = [...e.clipboardData && e.clipboardData.files || []][0];
      if (f) {
        e.preventDefault();
        onFile(f);
        return true;
      }
      return false;
    },
    submit(e) {
      if (e.target.id !== "aiForm") return false;
      e.preventDefault();
      if (S2.sending) {
        if (S2.ctrl) S2.ctrl.abort();
        return true;
      }
      if (S2.rec) return true;
      const i = $2("#aiQ");
      if (i) send(i.value.trim());
      return true;
    },
    back() {
      if (S2.memOpen) {
        memClose();
        return true;
      }
      if (S2.edit !== null) {
        S2.edit = null;
        paint2();
        return true;
      }
      return false;
    }
  };
}
var esc4, ic3, CHIPS;
var init_ai = __esm({
  "public/js/ai.js"() {
    init_md();
    esc4 = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
    ic3 = (id) => `<svg class="ic"><use href="#i-${id}"/></svg>`;
    CHIPS = ["Explain this simply", "Help with my homework", "Fix my sentence", "Quiz me", "Give me ideas"];
  }
});

function initGames() {
  return { html: () => "", mounted() {
  }, click: () => false, input: () => false, back: () => false };
}
var init_games = __esm({
  "public/js/games.js"() {
  }
});

var app_exports = {};
import { BareMuxConnection } from "./link/index.js";
async function pickSock() {
  if (sockPick) return sockPick;
  const list2 = (self.__vkl || []).filter(Boolean);
  if (list2.length < 2) return sockPick = list2[0] || SOCK;
  try {
    sockPick = await Promise.any(list2.map(sockOpen));
  } catch {
    sockPick = list2[0];
  }
  return sockPick;
}
function idbDelete(name) {
  return new Promise((res) => {
    let r;
    try {
      r = indexedDB.deleteDatabase(name);
    } catch {
      return res();
    }
    r.onsuccess = r.onerror = () => res();
    setTimeout(res, 4e3);
  });
}
function sjDbBroken() {
  return new Promise((res) => {
    let r;
    try {
      r = indexedDB.open("$scramjet");
    } catch {
      return res(false);
    }
    r.onupgradeneeded = () => {
      try {
        r.transaction.abort();
      } catch {
      }
    };
    r.onsuccess = () => {
      const db = r.result;
      const bad = !db.objectStoreNames.contains("config");
      db.close();
      res(bad);
    };
    r.onerror = () => res(false);
    setTimeout(() => res(false), 3e3);
  });
}
async function ensureScramjet() {
  if (sj) return sj;
  if (sjP) return sjP;
  if (typeof $scramjetLoadController === "undefined") throw new Error("engine unavailable");
  sjP = (async () => {
    const { ScramjetController } = $scramjetLoadController();
    const c = new ScramjetController({ prefix: SJP, files: { wasm: __vkb+"assets/rw.wasm", all: __vkb+"assets/rw.js", sync: __vkb+"assets/rw-sync.js" } });
    if (await sjDbBroken()) await idbDelete("$scramjet");
    try {
      await Promise.race([c.init(), new Promise((_, rej) => setTimeout(() => rej(new Error("engine init timeout")), 15e3))]);
    } catch (e) {
      try {
        if (c.db) c.db.close();
      } catch {
      }
      await idbDelete("$scramjet");
      sjP = null;
      throw e;
    }
    sj = c;
    return c;
  })();
  return sjP;
}
async function boot() {
  if (booted) return;
  if (bootP) return bootP;
  bootP = (async () => {
    await navigator.serviceWorker.register(__vkb+"sw.js", { scope: __vkb });
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) {
      await new Promise((res) => {
        const to = setTimeout(res, 3500);
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          clearTimeout(to);
          res();
        }, { once: true });
      });
    }
    pushSw();
    navigator.serviceWorker.addEventListener("controllerchange", pushSw);
    conn = new BareMuxConnection(__vkb+"assets/link/worker.js");
    await conn.setTransport(TRANSPORTS.std, [{ wisp: await pickSock() }]);
    curTransport = TRANSPORTS.std;
    booted = true;
  })().catch((e) => {
    bootP = null;
    booted = false;
    sockPick = null;
    console.error("[boot]", e);
    throw e;
  });
  return bootP;
}
function pushSw() {
  const sw = navigator.serviceWorker.controller;
  if (sw) sw.postMessage({ type: "adblock", on: S.adblock });
}
async function bootFor(engine) {
  if (engine === "std") {
    await ensureScramjet();
    await boot();
  } else await boot();
}
function uvReal(href) {
  try {
    const u = new URL(href, location.origin);
    if (u.origin === location.origin && u.pathname.startsWith(UVP)) return CFG.decodeUrl(u.pathname.slice(UVP.length) + u.search);
    if (u.origin === location.origin && u.pathname.startsWith(SJP)) return decodeURIComponent(u.pathname.slice(SJP.length)) + u.search;
    return u.href;
  } catch {
    return href;
  }
}
function makeGlitter() {
  const cv = $("#fx"), ctx = cv.getContext("2d"), host = vl;
  let o = FX.lit, W = 0, H = 0, P2 = [], T = [], raf = 0, run = false, last = 0, calm = false;
  const pick = () => o.colors[Math.random() * o.colors.length | 0];
  const kind = () => o.shape === "mix" ? Math.random() < 0.35 ? "star" : "dot" : o.shape === "stars" ? Math.random() < 0.1 ? "star" : "dot" : o.shape === "coq" ? Math.random() < 0.4 ? "pearl" : "heart" : o.shape;
  const mk = () => ({ x: Math.random() * W, y: Math.random() * H, r: rnd(o.size[0], o.size[1]), c: pick(), p: Math.random() * 6.28, sp: rnd(0.6, 1.8), vx: rnd(-0.08, 0.08), vy: o.mode === "fall" ? rnd(0.15, 0.45) : o.mode === "drift" ? rnd(-0.35, -0.06) : 0, k: kind() });
  function size() {
    const b = host.getBoundingClientRect();
    if (!b.width || !b.height) return false;
    const dpr = Math.min(2, devicePixelRatio || 1);
    W = b.width;
    H = b.height;
    cv.width = W * dpr | 0;
    cv.height = H * dpr | 0;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!P2.length) P2 = Array.from({ length: o.n }, mk);
    return true;
  }
  function star(x, y, r) {
    ctx.beginPath();
    ctx.moveTo(x, y - r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.quadraticCurveTo(x, y, x, y + r);
    ctx.quadraticCurveTo(x, y, x - r, y);
    ctx.quadraticCurveTo(x, y, x, y - r);
    ctx.fill();
  }
  function heart(x, y, r) {
    ctx.beginPath();
    ctx.moveTo(x, y + r * 0.9);
    ctx.bezierCurveTo(x - r * 1.6, y - r * 0.1, x - r * 0.8, y - r * 1.3, x, y - r * 0.45);
    ctx.bezierCurveTo(x + r * 0.8, y - r * 1.3, x + r * 1.6, y - r * 0.1, x, y + r * 0.9);
    ctx.fill();
  }
  function draw(q, a, sc) {
    ctx.fillStyle = q.c;
    const r = q.r * sc;
    if (q.k === "star") {
      if (o.glow) {
        ctx.globalAlpha = a * 0.22;
        ctx.beginPath();
        ctx.arc(q.x, q.y, r * 1.3, 0, 6.283);
        ctx.fill();
      }
      ctx.globalAlpha = a;
      star(q.x, q.y, r * 2.3);
    } else if (q.k === "heart") {
      ctx.globalAlpha = a;
      heart(q.x, q.y, r * 1.3);
    } else if (q.k === "bubble") {
      ctx.globalAlpha = 0.45 + a * 0.35;
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = "rgba(255,255,255,.95)";
      ctx.fillStyle = "rgba(255,170,215,.16)";
      ctx.beginPath();
      ctx.arc(q.x, q.y, r, 0, 6.283);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(q.x - r * 0.35, q.y - r * 0.35, r * 0.22, 0, 6.283);
      ctx.fill();
    } else if (q.k === "pearl") {
      ctx.globalAlpha = 0.5 + a * 0.5;
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "rgba(194,120,150,.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(q.x, q.y, r * 0.75, 0, 6.283);
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.globalAlpha = a;
      ctx.beginPath();
      ctx.arc(q.x, q.y, Math.max(0.45, r * 0.55), 0, 6.283);
      ctx.fill();
    }
  }
  function frame(t) {
    raf = run ? requestAnimationFrame(frame) : 0;
    if (!W) return;
    if (calm && last && t - last < 32) return;
    const dt = Math.min(50, t - (last || t)) / 16.7;
    last = t;
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = o.glow ? "lighter" : "source-over";
    const n = Math.round(P2.length * G.level * (calm ? 0.35 : 1));
    for (let i = 0; i < n; i++) {
      const q = P2[i];
      q.x += q.vx * dt;
      q.y += q.vy * dt;
      if (q.y < -12) {
        q.y = H + 12;
        q.x = Math.random() * W;
      }
      if (q.y > H + 12) {
        q.y = -12;
        q.x = Math.random() * W;
      }
      if (q.x < -12) q.x = W + 12;
      if (q.x > W + 12) q.x = -12;
      const tw = 0.5 + 0.5 * Math.sin(t * 2e-3 * q.sp + q.p);
      draw(q, o.mode === "twinkle" ? 0.12 + 0.88 * tw : 0.3 + 0.7 * tw, q.k === "star" ? 0.4 + 0.6 * tw : 1);
    }
    for (let i = T.length - 1; i >= 0; i--) {
      const q = T[i];
      q.life -= 0.02 * dt;
      if (q.life <= 0) {
        T.splice(i, 1);
        continue;
      }
      q.x += q.vx * dt;
      q.y += q.vy * dt;
      draw(q, q.life, 0.5 + q.life * 0.6);
    }
    ctx.globalAlpha = 1;
  }
  host.addEventListener("pointermove", (e) => {
    if (!o.trail || !run || !G.level || T.length > 140) return;
    if (e.target.closest(".set,.frame,.chatp")) return;
    const b = host.getBoundingClientRect();
    T.push({ x: e.clientX - b.left + rnd(-5, 5), y: e.clientY - b.top + rnd(-5, 5), r: rnd(o.size[0], o.size[1]) * 0.9, c: pick(), vx: rnd(-0.4, 0.4), vy: rnd(0.2, 0.9), k: o.tk || "star", life: 1 });
  });
  new ResizeObserver(() => {
    if (size() && !run) frame(performance.now());
  }).observe(host);
  return {
    config(next) {
      if (next === o && P2.length) return;
      o = next;
      P2 = [];
      T = [];
      if (size() && !run) frame(performance.now());
    },
    start() {
      if (run || !size()) return;
      if (reduce) {
        frame(performance.now());
        return;
      }
      run = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    },
    stop() {
      run = false;
      cancelAnimationFrame(raf);
      raf = 0;
    },
    redraw() {
      if (!run) frame(performance.now());
    },
    calm(on) {
      calm = !!on;
    },
    burst(x, y, n) {
      if (!G.level || !W) return;
      for (let i = 0; i < (n || 12); i++) {
        const a = Math.random() * 6.283, sp = rnd(0.7, 3.4);
        T.push({ x, y, r: rnd(o.size[0], o.size[1]) * 1.15, c: pick(), vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 0.4, k: o.tk || "star", life: 1 });
      }
      if (!run) frame(performance.now());
    }
  };
}
function tileList() {
  return S.tiles && S.tiles.length ? S.tiles : DEFAULT_TILES;
}
function pushState(t, st) {
  t.hist = t.hist.slice(0, t.hi + 1);
  t.hist.push(st);
  t.hi = t.hist.length - 1;
}
function resolve(q) {
  q = (q || "").trim();
  if (!q) return null;
  if (/^vella:\/\/settings/i.test(q)) return { kind: "settings" };
  if (/^vella:\/\/chat/i.test(q)) return { kind: "chat" };
  if (/^vella:\/\/ai/i.test(q)) return { kind: "ai" };
  if (/^vella:\/\/(newtab|home)/i.test(q)) return { kind: "ntp" };
  let url;
  if (/^https?:\/\//i.test(q)) url = q;
  else if (/^[a-z]+:\/\//i.test(q)) url = q;
  else if (!/\s/.test(q) && /^[\w-]+(\.[\w-]+)+(:\d+)?([/?#].*)?$/i.test(q)) url = "https://" + q;
  else return { kind: "site", url: SEARCH[S.search][0] + encodeURIComponent(q), host: SEARCH[S.search][0].split("/")[2], query: q, search: S.search };
  try {
    const u = new URL(url);
    return { kind: "site", url: u.href, host: u.hostname.replace(/^www\./, ""), query: "", search: S.search };
  } catch {
    return null;
  }
}
function frameOf(t) {
  if (t.el) return t.el;
  const ifr = document.createElement("iframe");
  ifr.className = "frame";
  ifr.setAttribute("allow", "autoplay; fullscreen; clipboard-read; clipboard-write; encrypted-media; picture-in-picture; gamepad; microphone; camera");
  ifr.setAttribute("referrerpolicy", "no-referrer");
  t.el = ifr;
  ifr.addEventListener("load", () => hookDoc(t));
  view.appendChild(ifr);
  return ifr;
}
async function navFrame(t, r, push) {
  const tok = ++t.nav;
  const engine = r.force || S.engine;
  t.eng = engine;
  t.loading = true;
  t.shown = false;
  if (t.id === active) {
    vl.classList.add("loading");
    syncOmni();
    syncLoader();
  }
  renderTabs();
  clearInterval(t.poll);
  clearTimeout(t.watchT);
  let ifr;
  try {
    await bootFor(engine);
    if (t.nav !== tok) return;
    ifr = frameOf(t);
    if (engine === "std" && sj) {
      if (!t.sf || t._sfEng !== "std") {
        try {
          t.sf = sj.createFrame(ifr);
        } catch {
          t.sf = null;
        }
        t._sfEng = "std";
        if (t.sf) {
          t.sf.addEventListener("urlchange", (e) => {
            if (e.url) onUrl(t, e.url);
          });
          t.sf.addEventListener("contextInit", (e) => patchWin(t, e.window || e.frame && e.frame.contentWindow));
        }
      }
      if (t.sf) t.sf.go(r.url);
      else ifr.src = encUv(r.url);
    } else {
      t.sf = null;
      t._sfEng = "alt";
      ifr.src = encUv(r.url);
    }
    if (t.id === active) syncOmni();
  } catch (e) {
    if (t.nav !== tok) return;
    if (engine === "std" && S.engine === "std") {
      navFrame(t, Object.assign({}, r, { force: "alt" }), false);
      return;
    }
    settle(t, "error", r, tok);
    return;
  }
  const finish = (kind) => {
    if (t.nav !== tok) return;
    settle(t, kind, r, tok);
  };
  watch(t, tok, () => finish("site"));
}
function frameTitle(t) {
  try {
    const d = t.el && t.el.contentDocument;
    const dt = d && (d.title || "").trim();
    return dt && !/^https?:\/\//i.test(dt) ? dt : null;
  } catch {
    return null;
  }
}
function settle(t, kind, r, tok) {
  if (tok != null && t.nav !== tok) return;
  clearInterval(t.poll);
  clearTimeout(t.watchT);
  t.loading = false;
  let title = kind === "site" ? pageTitle(r) : r.host;
  if (kind === "site") {
    const ft = frameTitle(t);
    if (ft) title = ft;
  }
  const st = { kind, url: r.url, host: r.host, query: r.query, search: r.search, eng: t.eng, retried: t.retried, title };
  t.hist[t.hi] = st;
  if (t.id === active) renderAll();
  else renderTabs();
}
function watch(t, tok, done) {
  const start = Date.now();
  t.poll = setInterval(() => {
    if (t.nav !== tok) return clearInterval(t.poll);
    const ifr = t.el;
    let rs = "", href = "";
    try {
      const d = ifr.contentDocument;
      rs = d ? d.readyState : "";
      href = ifr.contentWindow.location.href;
    } catch {
    }
    const live = href && href !== "about:blank";
    let errEng = "", ct = "";
    try {
      errEng = ifr.contentDocument.documentElement.getAttribute("data-vl-err") || "";
      ct = ifr.contentDocument.contentType || "";
    } catch {
    }
    if (errEng) {
      clearInterval(t.poll);
      clearTimeout(t.watchT);
      handleErr(t, tok, errEng);
      return;
    }
    if (live && ct === "text/plain") {
      clearInterval(t.poll);
      clearTimeout(t.watchT);
      const s = state(t);
      if (t.tries < 2) {
        t.tries++;
        const force = t.eng === "std" ? "alt" : "std";
        t.retried = true;
        setTimeout(() => {
          if (t.nav === tok) navFrame(t, { url: s.url, host: s.host, query: s.query, search: s.search, force }, false);
        }, 500);
      } else if (!sessionStorage.getItem("vlHeal")) {
        try {
          sessionStorage.setItem("vlHeal", "1");
          sessionStorage.setItem("vlHealUrl", s.url);
        } catch {
        }
        (async () => {
          try {
            for (const r of await navigator.serviceWorker.getRegistrations()) await r.unregister();
          } catch {
          }
          try {
            for (const k of await caches.keys()) await caches.delete(k);
          } catch {
          }
          location.reload();
        })();
      } else {
        t.loading = false;
        s.kind = "error";
        s.eng = t.eng;
        s.retried = true;
        if (t.id === active) renderAll();
        else renderTabs();
      }
      return;
    }
    if (live && ct !== "text/plain" && !t.shown && t.id === active) {
      t.shown = true;
      renderView();
    }
    if (t.eng !== "std" && live) {
      const real = uvReal(href);
      if (real && real !== state(t).url) trackUrl(t, real);
    }
    if (live && (rs === "interactive" || rs === "complete")) {
      clearInterval(t.poll);
      clearTimeout(t.watchT);
      hookDoc(t);
      done();
    }
  }, 220);
  t.watchT = setTimeout(() => {
    clearInterval(t.poll);
    if (t.nav === tok && t.loading) settle(t, "site", state(t), tok);
  }, 2e4);
}
function trackUrl(t, real) {
  const st = state(t);
  if (st.kind !== "site") return;
  st.url = real;
  st.host = prettyHost(real);
  st.title = st.query ? st.title : prettyHost(real);
  renderTabs();
  if (t.id === active) syncOmni();
}
function onUrl(t, real) {
  if (!real || real === "about:blank") return;
  const st = state(t);
  if (st.kind !== "site") return;
  if (norm(st.url) === norm(real)) {
    trackUrl(t, real);
    return;
  }
  st.url = real;
  st.host = prettyHost(real);
  st.query = "";
  st.title = prettyHost(real);
  st.retried = t.retried;
  renderTabs();
  if (t.id === active) syncOmni();
}
function fakeWin(w, u) {
  const stub = {
    closed: false,
    opener: w,
    name: "",
    length: 0,
    frames: [],
    location: { href: u, assign() {
    }, replace() {
    }, reload() {
    }, toString: () => u },
    document: { write() {
    }, writeln() {
    }, open() {
      return stub.document;
    }, close() {
    }, body: null, cookie: "" },
    focus() {
    },
    blur() {
    },
    close() {
      stub.closed = true;
    },
    postMessage() {
    },
    addEventListener() {
    },
    removeEventListener() {
    },
    moveTo() {
    },
    resizeTo() {
    },
    print() {
    }
  };
  return stub;
}
function patchWin(t, w) {
  try {
    if (!w || w.__vlHook || S.popblock === false) return;
    w.__vlHook = 1;
    const oo = w.open;
    w.open = function(u) {
      if (u) {
        openReal(t, String(u), true);
        return fakeWin(w, String(u));
      }
      return oo.apply(this, arguments);
    };
    const d = w.document;
    if (!d) return;
    d.addEventListener("keydown", forwardKey, true);
    d.addEventListener("click", (e) => {
      const a = e.target && e.target.closest && e.target.closest("a[href]");
      if (!a || e.defaultPrevented || e.button > 0) return;
      const blank = /^_(blank|new)$/i.test(a.target || "") || e.ctrlKey || e.metaKey;
      const href = a.getAttribute("href") || "";
      if (!blank || !href || /^(javascript:|#|mailto:|tel:)/i.test(href)) return;
      e.preventDefault();
      e.stopPropagation();
      openReal(t, uvReal(a.href));
    }, true);
    d.addEventListener("submit", (e) => {
      const f = e.target;
      if (!f || !/^_(blank|new)$/i.test(f.target || "")) return;
      f.target = "_self";
    }, true);
    const AP = w.HTMLAnchorElement && w.HTMLAnchorElement.prototype;
    if (AP && !AP.__vlC) {
      AP.__vlC = 1;
      const oc = AP.click;
      AP.click = function() {
        const tg = (this.target || "").toLowerCase(), h2 = this.getAttribute && this.getAttribute("href");
        if ((tg === "_blank" || tg === "_new") && h2 && !/^(javascript:|#|mailto:|tel:)/i.test(h2)) {
          openReal(t, this.href || h2, true);
          return;
        }
        return oc.apply(this, arguments);
      };
    }
    const FP = w.HTMLFormElement && w.HTMLFormElement.prototype;
    if (FP && !FP.__vlS) {
      FP.__vlS = 1;
      const os = FP.submit;
      FP.submit = function() {
        if (/^_(blank|new)$/i.test(this.target || "")) this.target = "_self";
        return os.apply(this, arguments);
      };
    }
    const NP = w.Node && w.Node.prototype;
    if (NP && !NP.__vlN) {
      NP.__vlN = 1;
      for (const m of ["appendChild", "insertBefore", "replaceChild", "append", "prepend", "after", "before"]) {
        const o = NP[m] || w.Element && w.Element.prototype[m];
        if (typeof o !== "function") continue;
        const host = NP[m] ? NP : w.Element.prototype;
        host[m] = function(...args) {
          const r = o.apply(this, args);
          try {
            for (const n of args) {
              if (!n || !n.tagName) continue;
              if (n.tagName === "IFRAME") hookFrame(t, n);
              else if (n.querySelectorAll) for (const f of n.querySelectorAll("iframe")) hookFrame(t, f);
            }
          } catch {
          }
          return r;
        };
      }
    }
    for (const f of d.querySelectorAll("iframe")) hookFrame(t, f);
    new w.MutationObserver((recs) => {
      for (const r of recs) for (const n of r.addedNodes) {
        if (n.tagName === "IFRAME") hookFrame(t, n);
        else if (n.querySelectorAll) for (const f of n.querySelectorAll("iframe")) hookFrame(t, f);
      }
    }).observe(d.documentElement || d, { childList: true, subtree: true });
  } catch {
  }
}
function sweepFrames(t) {
  const seen = new Set();
  const walk = (w, depth) => {
    if (!w || depth > 8 || seen.has(w)) return;
    seen.add(w);
    try {
      if (!w.__vlHook) patchWin(t, w);
      const n = Math.min(w.frames.length, 20);
      for (let i = 0; i < n; i++) walk(w.frames[i], depth + 1);
    } catch {
    }
  };
  try {
    walk(t.el && t.el.contentWindow, 0);
  } catch {
  }
}
function hookFrame(t, f) {
  try {
    if (f.__vlF) return;
    f.__vlF = 1;
    f.addEventListener("load", () => patchWin(t, f.contentWindow));
    patchWin(t, f.contentWindow);
  } catch {
  }
}
function hookDoc(t) {
  try {
    patchWin(t, t.el && t.el.contentWindow);
  } catch {
  }
}
function forwardKey(e) {
  if (e.altKey && !e.ctrlKey && !e.metaKey) {
    const k = (e.key || "").toLowerCase();
    if (k === "t") {
      e.preventDefault();
      newTab();
    } else if (k === "w") {
      e.preventDefault();
      closeTab(active);
    }
  }
}
function openReal(fromT, u, bg) {
  let abs = u;
  try {
    abs = new URL(u, uvReal(fromT.el.contentWindow.location.href)).href;
  } catch {
  }
  const r = resolve(abs);
  if (!r) return;
  const t = newTab({ kind: "site", url: r.url, host: r.host, query: "", search: r.search, eng: state(fromT).eng || S.engine, title: pageTitle(r) }, { bg: !!bg });
  navFrame(t, { ...r, force: state(fromT).eng }, false);
}
function loaderHTML(k) {
  if (k === "Orbit") return '<div class="vl-orbit" aria-hidden="true"><div class="core"><svg class="ic"><use href="#i-mark"/></svg></div><div class="ring"><svg><use href="#i-spark"/></svg></div><div class="ring r2"><svg><use href="#i-spark"/></svg></div><div class="ring r3"><svg><use href="#i-spark"/></svg></div></div>' + PW;
  if (k === "Bubble") return '<div class="vl-bubble" aria-hidden="true"><span class="av"><svg class="ic"><use href="#i-mark"/></svg></span><div class="bub"><i></i><i></i><i></i></div></div>' + PW;
  return '<div class="vl-neon" aria-hidden="true"><span>v</span><span>e</span><span>l</span><span>l</span><span>a</span></div>' + PW;
}
function syncLoader() {
  const t = cur();
  const on = !!t.loading && !t.shown && state(t).kind === "site";
  if (on) {
    const k = S.loader || "Neon";
    if (loaderEl.dataset.k !== k) {
      loaderEl.innerHTML = loaderHTML(k);
      loaderEl.dataset.k = k;
    }
    page.classList.remove("on");
    vl.classList.remove("on-ntp");
    if (t.el) t.el.classList.remove("on");
  }
  loaderEl.hidden = !on;
}
function favHTML(t) {
  const st = state(t);
  if (t.loading) return '<svg class="ic fav spin"><use href="#i-spark"/></svg>';
  if (st.kind === "ntp") return '<svg class="ic fav" style="color:var(--acc)"><use href="#i-mark"/></svg>';
  if (st.kind === "settings") return '<svg class="ic fav"><use href="#i-gear"/></svg>';
  if (st.kind === "chat") return '<svg class="ic fav" style="color:var(--acc)"><use href="#i-chat"/></svg>';
  if (st.kind === "ai") return '<svg class="ic fav" style="color:var(--acc)"><use href="#i-ai"/></svg>';
  if (st.kind === "games") return '<svg class="ic fav" style="color:var(--acc)"><use href="#i-game"/></svg>';
  if (st.query) return '<svg class="ic fav" style="color:' + SEARCH[st.search][2] + '"><use href="#i-search"/></svg>';
  const m = siteMeta(st.host);
  if (m) return '<svg class="ic fav" style="color:' + tint(m.c) + '"><use href="#' + m.i + '"/></svg>';
  return '<img class="fav" src=__vkb+"icon?d=' + encodeURIComponent(st.host) + `" alt="" onerror="this.replaceWith(Object.assign(document.createElementNS('http://www.w3.org/2000/svg','svg'),{}))">`;
}
function tabInner(t) {
  return favHTML(t) + "<span>" + esc5(titleOf(state(t))) + '</span><button class="tx" data-close="' + t.id + '" aria-label="Close tab"><svg class="ic"><use href="#i-x"/></svg></button>';
}
function renderTabs() {
  const bar = $(".bar"), form = $("#omniForm");
  bar.querySelectorAll(".ctab").forEach((x) => x.remove());
  if ((S.bar || "Standard") === "Compact") {
    tabsEl.innerHTML = "";
    vl.classList.toggle("one-tab", tabs.length < 2);
    const ai2 = tabs.findIndex((t) => t.id === active);
    let after = form;
    tabs.forEach((t, i) => {
      if (t.id === active) return;
      const el = document.createElement("div");
      el.className = "ctab";
      el.dataset.id = t.id;
      el.title = titleOf(state(t));
      el.innerHTML = tabInner(t);
      if (i < ai2) bar.insertBefore(el, form);
      else {
        bar.insertBefore(el, after.nextSibling);
        after = el;
      }
    });
    return;
  }
  vl.classList.remove("one-tab");
  tabsEl.innerHTML = tabs.map(
    (t) => '<div class="tab' + (t.id === active ? " on" : "") + '" data-id="' + t.id + '" role="tab" aria-selected="' + (t.id === active) + '" title="' + esc5(titleOf(state(t))) + '">' + tabInner(t) + "</div>"
  ).join("") + '<button class="tnew" id="tnew" aria-label="New tab"><svg class="ic"><use href="#i-plus"/></svg></button>';
}
function lightsInto(box) {
  const y = (x) => 12 + 60 * (1 - Math.pow(x % 0.5 / 0.5 * 2 - 1, 2));
  let d = "";
  for (let i = 0; i <= 80; i++) {
    const x = i / 80;
    d += (i ? "L" : "M") + (x * 1e3).toFixed(1) + " " + (y(x === 1 ? 0.9999 : x) - 3).toFixed(1);
  }
  let html = '<svg viewBox="0 0 1000 96" preserveAspectRatio="none" aria-hidden="true"><path d="' + d + '" fill="none" stroke-width="1.4" vector-effect="non-scaling-stroke"/></svg>';
  const N = Math.max(16, Math.min(42, Math.round((box.getBoundingClientRect().width || 1e3) / 38)));
  for (let i = 0; i < N; i++) {
    const x = 0.015 + i / (N - 1) * 0.97;
    html += '<i class="bulb" style="left:' + (x * 100).toFixed(2) + "%;top:" + y(x).toFixed(1) + "px;--d:" + rnd(1.2, 2.8).toFixed(2) + "s;--dl:-" + rnd(0, 3).toFixed(2) + 's"></i>';
  }
  box.innerHTML = html;
}
function ntpHTML() {
  const tiles = tileList().map((a, i) => {
    const m = a.g ? { i: a.g, c: a.c } : siteMeta(a.url) || { i: "i-globe", c: "" };
    const inner = a.g || siteMeta(a.url) ? '<svg class="ic"><use href="#' + m.i + '"/></svg>' : '<img src=__vkb+"icon?d=' + encodeURIComponent(prettyHost(a.url)) + '" alt="">';
    return '<button class="tile" data-open="' + esc5(a.url) + '" aria-label="' + esc5(a.name) + '" style="--g:' + (m.c || "var(--acc)") + ";--t:" + (a.t || "#e6d4ff") + '">' + inner + "</button>";
  }).join("");
  return '<div class="ntp"><div class="lights"></div><h1 class="word"><span class="w-t" data-t="vella">vella</span><svg class="w-spark"><use href="#i-spark"/></svg>' + BOW + '</h1><div class="hann" id="hann" hidden></div><form class="search" id="ntpForm" autocomplete="off"><i class="beam" aria-hidden="true"></i><svg class="ic tw" aria-hidden="true"><use href="#i-mark"/></svg><input id="ntpQ" placeholder="Search anything" spellcheck="false" aria-label="Search"></form><div class="tiles">' + tiles + "</div></div>";
}
function scIcon(a) {
  const m = a.g ? { i: a.g, c: a.c } : siteMeta(a.url) || { i: "i-globe", c: "" };
  return a.g || siteMeta(a.url) ? '<svg class="ic" style="color:' + (m.c || "var(--acc)") + '"><use href="#' + m.i + '"/></svg>' : '<img src=__vkb+"icon?d=' + encodeURIComponent(prettyHost(a.url)) + '" alt="">';
}
function cloakIco(c) {
  const ico = c.id === "custom" ? S.cloakIcon || __vkb+"img/vella.svg" : c.ico;
  return /^https?:|^data:|^\//.test(ico) ? '<img src="' + esc5(ico) + '" alt="">' : '<svg><use href="#i-mark"/></svg>';
}
function bodyHTML2() {
  if (stab === "General") return sub("Browsing") + row("Engine", seg("engine", [["std", ENG.std], ["alt", ENG.alt]])) + row("Retry failed sites in " + ENG.alt, tog("retry", "Retry failed sites in " + ENG.alt)) + row("Block ads", tog("adblock", "Block ads")) + row("Block pop-ups", tog("popblock", "Block pop-ups")) + row("Search engine", seg("search", ["DuckDuckGo", "Google", "Bing", "Brave"])) + sub("Performance") + row("Performance mode", tog("perf", "Performance mode"));
  if (stab === "Appearance") return sub("Theme") + '<div class="themes">' + THEMES.map(([id, n]) => '<button class="tt' + (S.theme === id ? " on" : "") + '" data-pick="' + id + '"><span class="tp tp-' + id + '"><i class="a"></i><i class="b"></i><b>vella</b></span>' + n + "</button>").join("") + "</div>" + sub("Shell") + row("Top bar", seg("bar", ["Standard", "Compact"])) + sub("Room") + row("LED colour", '<div class="sws">' + LEDS.map(([id, n, bg]) => '<button class="sw' + (S.led === id ? " on" : "") + '" data-ledpick="' + id + '" aria-label="' + n + '" style="--s:' + bg + '"><i></i></button>').join("") + "</div>") + row("Fairy lights", tog("lights", "Fairy lights")) + row("Glitter", seg("glitter", ["Off", "Soft", "Full"])) + sub("Loading") + row("Loader", seg("loader", [["Neon", "Neon sign"], ["Orbit", "Sparkle orbit"], ["Bubble", "Typing bubble"]]));
  if (stab === "Shortcuts") return sub("New Tab") + '<div class="sclist">' + tileList().map(
    (a, i) => '<div class="sc-row" draggable="true" data-i="' + i + '">' + scIcon(a) + '<span class="sc-n">' + esc5(a.name) + '</span><span class="sc-u">' + esc5(prettyHost(a.url)) + '</span><button class="sc-x" data-rm="' + i + '" aria-label="Remove"><svg class="ic"><use href="#i-x"/></svg></button></div>'
  ).join("") + '</div><button class="pill" id="scAdd">Add shortcut</button>';
  if (stab === "Tab cloak") {
    const c = CLOAKS.find((x) => x.id === S.cloak) || CLOAKS[0];
    const title = c.id === "custom" ? S.cloakTitle || "Vella" : c.title;
    let html = sub("Preview") + '<div class="prev"><div class="prev-tab">' + cloakIco(c) + "<span>" + esc5(title) + '</span><svg class="ic"><use href="#i-x"/></svg></div></div>' + sub("Disguise") + '<div class="cloaks">' + CLOAKS.map((x) => '<button class="ck' + (S.cloak === x.id ? " on" : "") + '" data-cloak="' + x.id + '">' + cloakIco(x) + x.name + "</button>").join("") + "</div>";
    if (S.cloak === "custom") html += sub("Custom") + '<div class="custom"><input class="inp" id="ckTitle" placeholder="Tab title" value="' + esc5(S.cloakTitle) + '"><input class="inp" id="ckIcon" placeholder="Icon URL" value="' + esc5(S.cloakIcon) + '"></div>';
    return html;
  }
  if (stab === "Privacy") return sub("Launch") + row("Open in about:blank", tog("blank", "Open in about:blank")) + sub("Panic") + row("Panic key", '<button class="key' + (waitKey ? " wait" : "") + '" id="keyBtn">' + (waitKey ? "Press a key" : esc5(keyName(S.panicKey))) + "</button>") + row("Panic site", '<input class="inp" id="panicUrl" value="' + esc5(S.panicUrl) + '" spellcheck="false" aria-label="Panic site">');
  return '<div class="about"><h2 class="word mini"><span class="w-t" data-t="vella">vella</span><svg class="w-spark"><use href="#i-spark"/></svg></h2><button class="reset" id="reset">Reset all settings</button></div>';
}
function setHTML() {
  return '<div class="set"><div class="set-in side"><nav class="snav" aria-label="Settings sections"><h1 class="sign">settings</h1><div class="nlist">' + STABS.map((n) => '<button class="ni' + (n === stab ? " on" : "") + '" data-stab="' + n + '">' + nico(n) + n + "</button>").join("") + '</div></nav><div class="sbody"><div class="shd" id="setHd">' + nico(stab) + "<h2>" + stab + '</h2></div><div id="setBody">' + cardify(bodyHTML2()) + "</div></div></div></div>";
}
function renderSetBody() {
  const b = page.querySelector("#setBody");
  if (!b) return;
  b.innerHTML = cardify(bodyHTML2());
  const hd = page.querySelector("#setHd");
  if (hd) hd.innerHTML = nico(stab) + "<h2>" + stab + "</h2>";
  page.querySelectorAll(".ni").forEach((x) => x.classList.toggle("on", x.dataset.stab === stab));
}
async function fillAnn() {
  try {
    if (!annC || Date.now() - annAt > 1e4) {
      annC = await (await fetch(__vkb+"api/c/ann")).json();
      annAt = Date.now();
    }
    const el = page.querySelector("#hann"), a = annC && annC.ann;
    if (!el) return;
    let gone = "";
    try {
      gone = localStorage.getItem("vella.annx") || "";
    } catch {
    }
    if (!a || !a.home || a.id === gone) {
      el.hidden = true;
      return;
    }
    el.innerHTML = '<svg class="ic"><use href="#i-mega"/></svg><span><b>' + esc5(a.by || "vella") + ":</b> " + esc5(a.text) + '</span><button data-annx="' + esc5(a.id) + '" aria-label="Hide announcement"><svg class="ic"><use href="#i-x"/></svg></button>';
    el.hidden = false;
  } catch {
  }
}
function renderView() {
  const t = cur(), st = state(t);
  const showPage = st.kind === "ntp" || st.kind === "settings" || st.kind === "ai" || st.kind === "games";
  vl.classList.toggle("on-ntp", st.kind === "ntp");
  page.classList.toggle("on", showPage);
  if (showPage) {
    const key = t.id + ":" + st.kind;
    if (st.kind !== "ai" && st.kind !== "games" || page.dataset.k !== key) {
      page.dataset.k = key;
      page.innerHTML = st.kind === "ntp" ? ntpHTML() : st.kind === "ai" ? ai.html() : st.kind === "games" ? games.html() : setHTML();
      const l = page.querySelector(".lights");
      if (l) lightsInto(l);
      if (st.kind === "ntp") fillAnn();
      if (st.kind === "ai") ai.mounted();
      if (st.kind === "games") games.mounted();
    }
  } else page.dataset.k = "";
  const isChat = st.kind === "chat";
  chatEl.classList.toggle("on", isChat);
  chat.show(isChat);
  glitter.calm(isChat);
  vl.classList.toggle("on-site", !showPage && !isChat && !!t.el);
  fxSync();
  tabs.forEach((x) => {
    if (x.el) x.el.classList.toggle("on", x.id === active && !showPage && !isChat);
  });
  syncLoader();
}
function prettyUrl(u) {
  try {
    const x = new URL(u);
    const scheme = x.protocol === "https:" ? "" : x.protocol + "//";
    let s = scheme + x.hostname.replace(/^www\./, "") + x.pathname + x.search + x.hash;
    if (s.endsWith("/") && !x.search && !x.hash) s = s.slice(0, -1);
    return s || x.hostname;
  } catch {
    return u;
  }
}
function syncOmni() {
  const t = cur(), st = state(t);
  if (document.activeElement !== omni) {
    const full = omniFull(st);
    omni.value = st.kind === "site" || st.kind === "error" ? prettyUrl(full) : full;
  }
  const ico = t.loading ? "i-search" : st.kind === "site" ? "i-lock" : st.kind === "settings" ? "i-mark" : st.kind === "chat" ? "i-chat" : st.kind === "ai" ? "i-ai" : st.kind === "games" ? "i-game" : "i-search";
  siteBtn.innerHTML = '<svg class="ic"><use href="#' + ico + '"/></svg>';
  $("#bStar").classList.toggle("on", !!t.star && st.kind === "site");
  $("#bChat").classList.toggle("on", st.kind === "chat");
  $("#bAI").classList.toggle("on", st.kind === "ai");
}
function applyTitle() {
  const t = cur(), st = state(t);
  const c = CLOAKS.find((x) => x.id === S.cloak);
  if (!c || c.id === "off") {
    document.title = BASE_TITLE;
    favEl.href = __vkb+"img/vella.svg";
  } else if (c.id === "custom") {
    document.title = S.cloakTitle || "Vella";
    favEl.href = S.cloakIcon || __vkb+"img/vella.svg";
  } else {
    document.title = c.title;
    favEl.href = c.ico;
  }
}
function renderAll() {
  const t = cur();
  renderTabs();
  renderView();
  syncOmni();
  applyTitle();
  $("#bBack").disabled = t.hi === 0 && !(state(t).kind === "site");
  $("#bBack").disabled = t.hi === 0;
  $("#bFwd").disabled = t.hi >= t.hist.length - 1;
  vl.classList.toggle("loading", t.loading);
  pop.hidden = true;
  hideSug();
}
function select(id) {
  const prev = cur();
  if (prev && prev.id !== id) prev.bgAt = Date.now();
  active = id;
  const t = cur();
  if (t && t.zz) wake(t);
  renderAll();
}
function playing(w, depth = 0) {
  try {
    const d = w.document;
    for (const m of d.querySelectorAll("video,audio")) if (!m.paused && !m.muted && m.currentTime > 0) return true;
    if (depth < 3) {
      for (const f of d.querySelectorAll("iframe")) if (f.contentWindow && playing(f.contentWindow, depth + 1)) return true;
    }
  } catch {
  }
  return false;
}
function sleepTab(t) {
  t.nav++;
  clearInterval(t.poll);
  clearTimeout(t.watchT);
  if (t.el) t.el.remove();
  t.el = null;
  t.sf = null;
  t.loading = false;
  t.zz = true;
  renderTabs();
}
function wake(t) {
  t.zz = false;
  const st = state(t);
  if (st.kind === "site") {
    t.retried = false;
    t.tries = 0;
    navFrame(t, { url: st.url, host: st.host, query: st.query, search: st.search, force: st.eng }, false);
  }
}
function newTab(st = { kind: "ntp" }, opts = {}) {
  const t = mkTab(st);
  const i = tabs.findIndex((x) => x.id === active);
  tabs.splice(i + 1, 0, t);
  if (!opts.bg) {
    select(t.id);
    if (st.kind === "ntp") omni.focus();
  } else renderTabs();
  return t;
}
function closeTab(id) {
  const i = tabs.findIndex((t2) => t2.id === id);
  if (i < 0) return;
  const t = tabs[i];
  t.nav++;
  clearInterval(t.poll);
  clearTimeout(t.watchT);
  if (t.el) t.el.remove();
  tabs.splice(i, 1);
  if (!tabs.length) tabs = [mkTab({ kind: "ntp" })];
  if (id === active) active = (tabs[i] || tabs[i - 1] || tabs[0]).id;
  renderAll();
}
function go(q, t = cur()) {
  const r = resolve(q);
  if (!r) return;
  t.retried = false;
  t.tries = 0;
  if (r.kind !== "site") {
    t.nav++;
    clearInterval(t.poll);
    t.loading = false;
    if (t.el) {
      t.el.remove();
      t.el = null;
      t.sf = null;
    }
    pushState(t, { kind: r.kind });
    renderAll();
    return;
  }
  pushState(t, { kind: "site", url: r.url, host: r.host, query: r.query, search: r.search, eng: S.engine, title: pageTitle(r) });
  navFrame(t, r, false);
}
function openSettings() {
  const ex = tabs.find((t2) => state(t2).kind === "settings");
  if (ex) return select(ex.id);
  const t = cur();
  if (state(t).kind === "ntp" && !t.loading) {
    pushState(t, { kind: "settings" });
    renderAll();
    return;
  }
  newTab({ kind: "settings" });
}
function openAi() {
  const ex = tabs.find((t2) => state(t2).kind === "ai");
  if (ex) return select(ex.id);
  const t = cur();
  if (state(t).kind === "ntp" && !t.loading) {
    pushState(t, { kind: "ai" });
    renderAll();
    return;
  }
  newTab({ kind: "ai" });
}
function openApp(url, force) {
  const r = resolve(url);
  if (!r) return;
  const st = { kind: "site", url: r.url, host: r.host, query: "", search: r.search, eng: force || S.engine, title: pageTitle(r) };
  const t = cur(), first = state(t).kind === "ntp" && !t.loading;
  const tab = first ? t : newTab(st);
  tab.retried = false;
  tab.tries = 0;
  if (first) pushState(tab, st);
  navFrame(tab, { ...r, force }, false);
}
function openChat() {
  const ex = tabs.find((t2) => state(t2).kind === "chat");
  if (ex) return select(ex.id);
  const t = cur();
  if (state(t).kind === "ntp" && !t.loading) {
    pushState(t, { kind: "chat" });
    renderAll();
    return;
  }
  newTab({ kind: "chat" });
}
function reload() {
  const t = cur(), st = state(t);
  if (st.kind === "site") {
    t.retried = false;
    t.tries = 0;
    navFrame(t, { url: st.url, host: st.host, query: st.query, search: st.search }, false);
  } else renderAll();
}
function goHist(d) {
  const t = cur();
  const ni = t.hi + d;
  if (ni < 0 || ni >= t.hist.length) return;
  t.nav++;
  clearInterval(t.poll);
  t.loading = false;
  t.tries = 0;
  t.hi = ni;
  const st = state(t);
  if (st.kind === "site") {
    t.retried = !!st.retried;
    navFrame(t, { url: st.url, host: st.host, query: st.query, search: st.search, force: st.eng }, false);
  } else {
    if (t.el) t.el.classList.remove("on");
    renderAll();
  }
}
function handleErr(t, tok, from) {
  if (t.nav !== tok) return;
  t.loading = false;
  const st = state(t);
  if (from === "std" && S.retry && !t.retried && st.kind === "site") {
    t.retried = true;
    if (t.id === active) showToast("Retrying " + (st.host || "this site") + " in " + ENG.alt);
    navFrame(t, { url: st.url, host: st.host, query: st.query, search: st.search, force: "alt" }, false);
    return;
  }
  st.kind = "error";
  st.eng = from === "std" ? "std" : "alt";
  st.retried = t.retried;
  if (t.id === active) renderAll();
  else renderTabs();
}
function apply() {
  vl.dataset.theme = S.theme;
  vl.dataset.led = S.led;
  vl.dataset.bar = (S.bar || "Standard").toLowerCase();
  vl.classList.toggle("nolights", !S.lights);
  vl.classList.toggle("perf", !!S.perf);
  fxSync();
  G.level = LEVEL[S.glitter] ?? 1;
  vl.classList.toggle("noglit", !G.level);
  glitter.config(FX[S.theme] || FX.lit);
  glitter.redraw();
  pushSw();
  applyTitle();
  renderTabs();
}
function changed() {
  save();
  apply();
  renderSetBody();
}
function showToast(msg) {
  toast.querySelector("span").textContent = msg;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 2800);
}
function hideSug() {
  sug.hidden = true;
  sugItems = [];
  sugSel = -1;
}
function placeSug() {
  const a = omni.getBoundingClientRect(), b = vl.getBoundingClientRect();
  sug.style.left = a.left - b.left + "px";
  sug.style.top = a.bottom - b.top + 6 + "px";
  sug.style.width = a.width + "px";
}
function renderSug() {
  if (!sugItems.length) return hideSug();
  sug.innerHTML = sugItems.map((s, i) => '<button class="' + (i === sugSel ? "sel" : "") + '" data-sug="' + esc5(s) + '"><svg class="ic"><use href="#i-search"/></svg><span>' + esc5(s) + "</span></button>").join("");
  placeSug();
  sug.hidden = false;
}
function fetchSug(q) {
  clearTimeout(sugTimer);
  if (!q || /^[a-z]+:\/\//i.test(q)) return hideSug();
  const my = ++sugSeq;
  sugTimer = setTimeout(async () => {
    try {
      const r = await fetch(__vkb+"suggest?q=" + encodeURIComponent(q));
      const list2 = await r.json();
      if (my !== sugSeq || document.activeElement !== omni) return;
      sugItems = list2.slice(0, 8);
      sugSel = -1;
      renderSug();
    } catch {
      hideSug();
    }
  }, 120);
}
function redrawTiles() {
  if (state(cur()).kind === "settings") renderSetBody();
  else renderView();
}
function tabOfWin(w) {
  for (let i = 0, cur2 = w; cur2 && i < 12; i++, cur2 = cur2.parent === cur2 ? null : cur2.parent) {
    const t = tabs.find((x) => x.el && x.el.contentWindow === cur2);
    if (t) return t;
  }
  return null;
}
function fxSync() {
  document.hidden || S.perf || vl.classList.contains("on-site") ? glitter.stop() : glitter.start();
}
var $, vl, tabsEl, view, omni, toast, pop, sug, siteBtn, favEl, reduce, CFG, UVP, SJP, SOCK, sockPick, sockOpen, TRANSPORTS, LOCAL, esc5, rnd, norm, BASE_TITLE, DEF, S, save, ENG, LEVEL, SEARCH, SITES, DEFAULT_TILES, LEDS, THEMES, CLOAKS, FX, BOW, h, greet, openOk, nativeOpen, G, glitter, sj, conn, booted, bootP, curTransport, sjP, encUv, siteMeta, tint, prettyHost, seq, mkTab, state, tabs, active, cur, pageTitle, page, chatEl, chat, games, ai, loaderEl, PW, titleOf, STABS, stab, waitKey, seg, tog, row, sub, cardify, SICON, nico, keyName, annC, annAt, omniFull, toastTimer, sugItems, sugSel, sugTimer, sugSeq, mmenu, dragI;
var init_app = __esm({
  "public/js/app.js"() {
    init_chat();
    init_ai();
    init_games();
    $ = (s) => document.querySelector(s);
    vl = $("#vl");
    tabsEl = $("#tabs");
    view = $("#view");
    omni = $("#omni");
    toast = $("#toast");
    pop = $("#pop");
    sug = $("#sug");
    siteBtn = $("#siteBtn");
    favEl = $("#favicon");
    reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    CFG = self.__vl$config;
    UVP = CFG.prefix;
    SJP = __vkb+"g/";
    SOCK = self.__vkw || (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + __vkb+"e/";
    sockPick = null;
    sockOpen = (u) => new Promise((ok, no) => {
      let ws;
      try {
        ws = new WebSocket(u);
      } catch {
        return no();
      }
      const t = setTimeout(() => {
        try {
          ws.close();
        } catch {
        }
        no();
      }, 6e3);
      ws.onopen = () => {
        clearTimeout(t);
        try {
          ws.close();
        } catch {
        }
        ok(u);
      };
      ws.onerror = () => {
        clearTimeout(t);
        no();
      };
    });
    TRANSPORTS = { std: __vkb+"assets/net.js", alt: __vkb+"assets/net-alt.js" };
    LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
    esc5 = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
    rnd = (a, b) => a + Math.random() * (b - a);
    norm = (u) => {
      try {
        return new URL(u).href;
      } catch {
        return u;
      }
    };
    BASE_TITLE = "vella";
    DEF = {
      theme: "lit",
      led: "violet",
      glitter: "Full",
      lights: true,
      engine: "std",
      retry: true,
      adblock: true,
      search: "DuckDuckGo",
      cloak: "off",
      cloakTitle: "",
      cloakIcon: "",
      blank: false,
      panicKey: "`",
      panicUrl: "https://google.com",
      bar: "Compact",
      tiles: null,
      loader: "Neon",
      perf: false,
      popblock: true
    };
    S = Object.assign({}, DEF);
    try {
      Object.assign(S, JSON.parse(localStorage.getItem("vella") || "{}"));
    } catch (e) {
    }
    save = () => {
      try {
        localStorage.setItem("vella", JSON.stringify(S));
      } catch (e) {
      }
    };
    if (!S.barV2) {
      S.bar = "Compact";
      S.barV2 = true;
      save();
    }
    if (!S.blankV2) {
      S.blank = false;
      S.blankV2 = true;
      save();
    }
    if (S.theme === "gum") {
      S.theme = "pearl";
      save();
    }
    if (S.engine === "Scramjet") {
      S.engine = "std";
      save();
    }
    if (S.engine === "Ultraviolet") {
      S.engine = "alt";
      save();
    }
    ENG = { std: "Scramjet", alt: "Ultraviolet" };
    LEVEL = { Off: 0, Soft: 0.45, Full: 1 };
    SEARCH = {
      DuckDuckGo: ["https://duckduckgo.com/?q=", " at DuckDuckGo", "#de5833"],
      Google: ["https://www.google.com/search?q=", " - Google Search", "#4285f4"],
      Bing: ["https://www.bing.com/search?q=", " - Search", "#0f8c7d"],
      Brave: ["https://search.brave.com/search?q=", " - Brave Search", "#fb542b"]
    };
    SITES = {
      youtube: ["g-yt", "#ff4d6d"],
      discord: ["g-dc", "#8e9bff"],
      tiktok: ["g-tt", ""],
      twitch: ["g-tw", "#b98cff"],
      soundcloud: ["g-sc", "#ff8a4d"],
      pinterest: ["g-pin", "#ff5c8a"],
      instagram: ["g-ig", "#ff8fcf"],
      roblox: ["g-rb", ""],
      snapchat: ["g-sn", "#e9d400"]
    };
    DEFAULT_TILES = [
      { name: "YouTube", url: "https://youtube.com", g: "g-yt", c: "#ff4d6d", t: "#ffc6e2" },
      { name: "Discord", url: "https://discord.com/app", g: "g-dc", c: "#8e9bff", t: "#dccdff" },
      { name: "TikTok", url: "https://tiktok.com", g: "g-tt", c: "", t: "#c9f1e2" },
      { name: "Twitch", url: "https://twitch.tv", g: "g-tw", c: "#b98cff", t: "#e6d4ff" },
      { name: "SoundCloud", url: "https://soundcloud.com", g: "g-sc", c: "#ff8a4d", t: "#ffd6c6" },
      { name: "Pinterest", url: "https://pinterest.com", g: "g-pin", c: "#ff5c8a", t: "#fff0b8" }
    ];
    LEDS = [["violet", "Purple", "linear-gradient(135deg,#a63dff,#ff4fc3)"], ["pink", "Pink", "linear-gradient(135deg,#ff3fb0,#ff9ade)"], ["blue", "Blue", "linear-gradient(135deg,#4d62ff,#b36bff)"], ["rainbow", "Rainbow", "conic-gradient(#ff4f8b,#ffa34f,#ffe94f,#4fff9d,#4fc3ff,#8b4fff,#ff4f8b)"]];
    THEMES = [["lit", "Lit Room"], ["star", "Stardust"], ["pearl", "Pearl"], ["jelly", "Jelly"], ["coq", "Coquette"]];
    CLOAKS = [
      { id: "off", name: "Off", title: "Vella", ico: __vkb+"img/vella.svg" },
      { id: "google", name: "Google", title: "Google", ico: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="%23fff" stroke="%23e3e3e8"/><text x="12" y="17" text-anchor="middle" font-family="Arial" font-weight="700" font-size="14" fill="%234285f4">G</text></svg>' },
      { id: "classroom", name: "Classroom", title: "Home", ico: "https://ssl.gstatic.com/classroom/favicon.png" },
      { id: "docs", name: "Docs", title: "Untitled document - Google Docs", ico: "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico" },
      { id: "drive", name: "Drive", title: "My Drive - Google Drive", ico: "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png" },
      { id: "gmail", name: "Gmail", title: "Inbox (3)", ico: "https://ssl.gstatic.com/gmail-static/images/logo/gmail-favicon.png" },
      { id: "custom", name: "Custom", title: "", ico: "" }
    ];
    FX = {
      lit: { mode: "drift", colors: ["#ff7ade", "#c98bff", "#ffffff", "#a84dff", "#ffc2f0"], n: 260, shape: "mix", glow: true, trail: true, size: [1, 3.4] },
      star: { mode: "twinkle", colors: ["#ffffff", "#ffffff", "#e7d4ff", "#ffc4ec", "#bcd0ff"], n: 440, shape: "stars", glow: true, size: [1, 3.4] },
      pearl: { mode: "twinkle", colors: ["#f2a7c8", "#d8b4f0", "#ffffff", "#f7c3da"], n: 200, shape: "mix", trail: true, size: [1, 3.2] },
      jelly: { mode: "drift", colors: ["#ffffff"], n: 46, shape: "bubble", trail: true, tk: "bubble", size: [4, 12] },
      coq: { mode: "fall", colors: ["#f4a6c0", "#e9829f", "#f7c7d6"], n: 70, shape: "coq", trail: true, tk: "heart", size: [2.5, 5] }
    };
    BOW = '<svg class="w-bow" viewBox="0 0 64 40" aria-hidden="true"><path d="M32 18C24 6 8 1 4 8s3 20 28 10zM32 18c8-12 24-17 28-10s-3 20-28 10z" fill="#f4a6c0" stroke="#c2436f" stroke-width="1.8" stroke-linejoin="round"/><path d="M28 19 20 37l7-3 3 4 2-19zM36 19l8 18-7-3-3 4-2-19z" fill="#e9829f" stroke="#c2436f" stroke-width="1.8" stroke-linejoin="round"/><circle cx="32" cy="18" r="5" fill="#d85a86" stroke="#c2436f" stroke-width="1.8"/><path d="M12 9c3-2 8-1 12 3M52 9c-3-2-8-1-12 3" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".7"/></svg>';
    h = (new Date()).getHours();
    greet = h < 5 ? "Good night" : h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : h < 22 ? "Good evening" : "Good night";
    openOk = false;
    nativeOpen = window.open.bind(window);
    if (S.blank && !LOCAL && window.top === window.self) {
      try {
        if (!sessionStorage.getItem("vl.blank")) {
          sessionStorage.setItem("vl.blank", "1");
          openOk = true;
          const w = window.open("about:blank", "_blank");
          openOk = false;
          if (w && w.document) {
            const html = "<!doctype html><title>" + BASE_TITLE + "</title><style>html,body{margin:0;height:100%;background:#0b0512}iframe{border:0;width:100%;height:100%}</style><iframe src='" + location.href + "'></iframe>";
            w.document.open();
            w.document.write(html);
            w.document.close();
            location.replace(S.panicUrl);
          }
        }
      } catch (e) {
      }
    }
    G = { level: LEVEL[S.glitter] ?? 1 };
    glitter = makeGlitter();
    sj = null;
    conn = null;
    booted = false;
    bootP = null;
    curTransport = "";
    sjP = null;
    encUv = (u) => UVP + CFG.encodeUrl(u);
    siteMeta = (host) => {
      if (!host) return null;
      const k = Object.keys(SITES).find((s) => host.includes(s));
      return k ? { i: SITES[k][0], c: SITES[k][1] } : null;
    };
    tint = (c) => !c ? "var(--acc)" : /^(pearl|jelly|coq)$/.test(S.theme) && /^#(ffffff|e9d400)$/i.test(c) ? "var(--text)" : c;
    prettyHost = (u) => {
      try {
        return new URL(u).hostname.replace(/^www\./, "");
      } catch {
        return u;
      }
    };
    seq = 0;
    mkTab = (st) => ({ id: ++seq, hist: [st], hi: 0, el: null, sf: null, eng: null, loading: false, nav: 0, star: false, watchT: 0, retried: false, poll: 0, tries: 0, bgAt: 0, zz: false });
    state = (t) => t.hist[t.hi];
    tabs = [mkTab({ kind: "ntp" })];
    active = tabs[0].id;
    cur = () => tabs.find((t) => t.id === active);
    pageTitle = (r) => r.query ? r.query + SEARCH[r.search][1] : r.host;
    window.open = function(u, ...rest) {
      if (openOk || !u || String(u) === "about:blank") return nativeOpen(u, ...rest);
      if (S.popblock === false) return nativeOpen(u, ...rest);
      const t = tabs.find((x) => x.id === active) || tabs[0];
      if (t && t.el) openReal(t, String(u), true);
      else go(String(u));
      return fakeWin(window, String(u));
    };
    page = document.createElement("div");
    page.className = "page";
    page.id = "page";
    view.appendChild(page);
    chatEl = document.createElement("div");
    chatEl.className = "page chatp";
    chatEl.id = "chatp";
    view.appendChild(chatEl);
    chat = initChat({ el: chatEl, pip: $("#pip"), toast: (m) => showToast(m) });
    games = initGames({ page });
    ai = initAi({ page, toast: (m) => showToast(m), pfp: () => chat.pfp(), open: (u) => openApp(u), api: (path, body) => chat.api(path, body) });
    loaderEl = document.createElement("div");
    loaderEl.className = "vload";
    loaderEl.hidden = true;
    view.appendChild(loaderEl);
    PW = '<div class="pw" role="status">please wait twin<i>.</i><i>.</i><i>.</i></div>';
    titleOf = (st) => st.kind === "ntp" ? "New Tab" : st.kind === "settings" ? "Settings" : st.kind === "chat" ? "Chat" : st.kind === "ai" ? "AI" : st.kind === "games" ? "Games" : st.title || st.host;
    STABS = ["General", "Appearance", "Shortcuts", "Tab cloak", "Privacy", "About"];
    stab = "General";
    waitKey = false;
    seg = (k, opts) => '<div class="seg" data-k="' + k + '">' + opts.map((o) => {
      const v = Array.isArray(o) ? o[0] : o, l = Array.isArray(o) ? o[1] : o;
      return '<button data-v="' + esc5(v) + '" class="' + (S[k] === v ? "on" : "") + '">' + l + "</button>";
    }).join("") + "</div>";
    tog = (k, label) => '<button class="tog" role="switch" aria-checked="' + !!S[k] + '" data-tog="' + k + '" aria-label="' + label + '"><i></i></button>';
    row = (label, ctl) => '<div class="row"><span>' + label + "</span>" + ctl + "</div>";
    sub = (t) => '<div class="sub">' + t + "</div>";
    cardify = (h2) => h2.split("").filter((x) => x.trim()).map((x) => '<section class="scard">' + x + "</section>").join("");
    SICON = { General: "i-globe", Appearance: "i-palette", Shortcuts: "i-star", "Tab cloak": "i-mask", Privacy: "i-lock", About: "i-heart" };
    nico = (n) => '<span class="nico"><svg class="ic"><use href="#' + SICON[n] + '"/></svg></span>';
    keyName = (k) => k === " " ? "Space" : k;
    annC = null;
    annAt = 0;
    addEventListener("vl-ann", () => {
      annC = null;
      if (state(cur()).kind === "ntp") fillAnn();
    });
    omniFull = (st) => st.kind === "site" || st.kind === "error" ? st.url : st.kind === "settings" ? "vella://settings" : st.kind === "chat" ? "vella://chat" : st.kind === "ai" ? "vella://ai" : st.kind === "games" ? "vella://games" : "";
    toastTimer = 0;
    sugItems = [];
    sugSel = -1;
    sugTimer = 0;
    sugSeq = 0;
    siteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const t = cur(), st = state(t);
      if (t.loading || st.kind !== "site" && st.kind !== "error") {
        omni.focus();
        return;
      }
      if (!pop.hidden) {
        pop.hidden = true;
        return;
      }
      pop.innerHTML = "<b>" + esc5(st.host) + '</b><div class="r"><span>Engine</span><span>' + (ENG[st.eng] || st.eng) + (st.retried ? " (retry)" : "") + '</span></div><div class="r"><span>Connection</span><span>' + (st.kind === "error" ? "Failed" : "Secure") + "</span></div>";
      const a = siteBtn.getBoundingClientRect(), b = vl.getBoundingClientRect();
      pop.style.left = Math.max(12, Math.min(a.left - b.left - 6, b.width - 282)) + "px";
      pop.style.top = a.bottom - b.top + 10 + "px";
      pop.hidden = false;
    });
    document.addEventListener("click", (e) => {
      if (!pop.hidden && !e.target.closest("#pop")) pop.hidden = true;
      if (!mmenu.hidden && !e.target.closest("#mmenu,#bMore")) {
        mmenu.hidden = true;
        $("#bMore").setAttribute("aria-expanded", "false");
      }
      if (!sug.hidden && !e.target.closest("#sug,#omni")) hideSug();
    });
    tabsEl.addEventListener("click", (e) => {
      const x = e.target.closest("[data-close]");
      if (x) {
        e.stopPropagation();
        closeTab(+x.dataset.close);
        return;
      }
      if (e.target.closest("#tnew")) {
        newTab();
        return;
      }
      const tb = e.target.closest(".tab");
      if (tb && +tb.dataset.id !== active) select(+tb.dataset.id);
    });
    tabsEl.addEventListener("mousedown", (e) => {
      if (e.button === 1) e.preventDefault();
    });
    tabsEl.addEventListener("auxclick", (e) => {
      const tb = e.target.closest(".tab");
      if (e.button === 1 && tb) {
        e.preventDefault();
        closeTab(+tb.dataset.id);
      }
    });
    $("#omniForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const v = sugSel >= 0 ? sugItems[sugSel] : omni.value;
      hideSug();
      go(v);
      omni.blur();
    });
    omni.addEventListener("focus", () => {
      omni.value = omniFull(state(cur()));
      omni.select();
    });
    omni.addEventListener("blur", () => setTimeout(() => {
      syncOmni();
    }, 120));
    omni.addEventListener("input", () => fetchSug(omni.value.trim()));
    omni.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        hideSug();
        omni.blur();
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const v = sugSel >= 0 ? sugItems[sugSel] : omni.value;
        hideSug();
        go(v);
        omni.blur();
        return;
      }
      if (sug.hidden || !sugItems.length) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        sugSel = (sugSel + 1) % sugItems.length;
        renderSug();
        omni.value = sugItems[sugSel];
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        sugSel = (sugSel - 1 + sugItems.length) % sugItems.length;
        renderSug();
        omni.value = sugItems[sugSel];
      }
    });
    sug.addEventListener("mousedown", (e) => {
      const b = e.target.closest("[data-sug]");
      if (b) {
        e.preventDefault();
        hideSug();
        go(b.dataset.sug);
        omni.blur();
      }
    });
    mmenu = $("#mmenu");
    $("#bMore").addEventListener("click", (e) => {
      e.stopPropagation();
      if (!mmenu.hidden) {
        mmenu.hidden = true;
        e.currentTarget.setAttribute("aria-expanded", "false");
        return;
      }
      const MM = [["bWatch", "tv", "Watch"], ["bAI", "ai", "AI"], ["bRblx", "rblx", "Roblox"], ["bChat", "chat", "Chat"], ["bNew", "plus", "New tab"], ["bBack", "back", "Back"], ["bFwd", "fwd", "Forward"], ["bReload", "reload", "Reload"], ["bGear", "gear", "Settings"]];
      mmenu.innerHTML = MM.map(([id, i, l], n) => {
        const b2 = $("#" + id);
        return `${id === "bNew" ? '<i class="mmsep"></i>' : ""}<button type="button" role="menuitem" data-mm="${id}"${b2.disabled ? " disabled" : ""}${b2.classList.contains("on") ? ' class="on"' : ""}><svg class="ic"><use href="#i-${i}"/></svg>${l}${id === "bChat" && !$("#pip").hidden ? '<i class="mmdot"></i>' : ""}</button>`;
      }).join("");
      const a = e.currentTarget.getBoundingClientRect(), b = vl.getBoundingClientRect();
      mmenu.style.top = a.bottom - b.top + 8 + "px";
      mmenu.style.right = Math.max(8, b.right - a.right) + "px";
      mmenu.hidden = false;
      e.currentTarget.setAttribute("aria-expanded", "true");
    });
    mmenu.addEventListener("click", (e) => {
      const m = e.target.closest("[data-mm]");
      if (!m || m.disabled) return;
      mmenu.hidden = true;
      $("#bMore").setAttribute("aria-expanded", "false");
      $("#" + m.dataset.mm).click();
    });
    $("#bBack").addEventListener("click", () => goHist(-1));
    $("#bFwd").addEventListener("click", () => goHist(1));
    $("#bReload").addEventListener("click", reload);
    $("#bGear").addEventListener("click", openSettings);
    $("#bChat").addEventListener("click", openChat);
    $("#bAI").addEventListener("click", openAi);
    new MutationObserver(() => $("#bMore").classList.toggle("unread", !$("#pip").hidden)).observe($("#pip"), { attributes: true, attributeFilter: ["hidden"] });
    $("#bWatch").addEventListener("click", () => openApp("https://cinera.cfd", "alt"));
    $("#bRblx").addEventListener("click", () => openApp("https://nowgg.fun/apps/a/19900/b.html"));
    $("#bStar").addEventListener("click", () => {
      const t = cur();
      if (state(t).kind !== "site") return;
      t.star = !t.star;
      syncOmni();
    });
    $("#bLogo").addEventListener("click", () => {
      const t = cur();
      if (state(t).kind === "ntp") return;
      t.nav++;
      clearInterval(t.poll);
      t.loading = false;
      if (t.el) {
        t.el.remove();
        t.el = null;
        t.sf = null;
      }
      pushState(t, { kind: "ntp" });
      renderAll();
    });
    $("#bNew").addEventListener("click", () => newTab());
    $("#bClose").addEventListener("click", () => closeTab(active));
    $(".bar").addEventListener("click", (e) => {
      const c = e.target.closest(".ctab");
      if (!c) return;
      const x = e.target.closest("[data-close]");
      if (x) {
        e.stopPropagation();
        closeTab(+x.dataset.close);
        return;
      }
      select(+c.dataset.id);
    });
    $(".bar").addEventListener("auxclick", (e) => {
      const c = e.target.closest(".ctab");
      if (e.button === 1 && c) {
        e.preventDefault();
        closeTab(+c.dataset.id);
      }
    });
    document.addEventListener("pointerdown", (e) => {
      if (e.target.closest(".frame,.set,.chatp,input,textarea,#sug")) return;
      const b = vl.getBoundingClientRect();
      glitter.burst(e.clientX - b.left, e.clientY - b.top, e.target.closest(".tile") ? 32 : 20);
    });
    vl.addEventListener("pointermove", (e) => {
      const s = e.target.closest(".search,.omni");
      if (!s) return;
      const r = s.getBoundingClientRect();
      s.style.setProperty("--x", e.clientX - r.left + "px");
      s.style.setProperty("--y", e.clientY - r.top + "px");
    });
    dragI = -1;
    page.addEventListener("click", (e) => {
      if (games.click(e)) return;
      if (ai.click(e)) return;
      const q = (s) => e.target.closest(s);
      let el;
      if (el = q("[data-annx]")) {
        try {
          localStorage.setItem("vella.annx", el.dataset.annx);
        } catch {
        }
        el.parentElement.hidden = true;
        return;
      }
      if (el = q("[data-stab]")) {
        stab = el.dataset.stab;
        waitKey = false;
        renderSetBody();
        return;
      }
      if (el = q(".seg button")) {
        S[el.parentElement.dataset.k] = el.dataset.v || el.textContent;
        changed();
        return;
      }
      if (el = q("[data-tog]")) {
        S[el.dataset.tog] = !S[el.dataset.tog];
        changed();
        return;
      }
      if (el = q("[data-ledpick]")) {
        S.led = el.dataset.ledpick;
        changed();
        return;
      }
      if (el = q("[data-pick]")) {
        S.theme = el.dataset.pick;
        changed();
        return;
      }
      if (el = q("[data-cloak]")) {
        S.cloak = el.dataset.cloak;
        changed();
        return;
      }
      if (q("#keyBtn")) {
        waitKey = !waitKey;
        renderSetBody();
        return;
      }
      if (q("#reset")) {
        if (confirm("Reset all Vella settings?")) {
          Object.assign(S, DEF);
          S.tiles = null;
          save();
          apply();
          renderAll();
        }
        return;
      }
      if (el = q("[data-rm]")) {
        e.stopPropagation();
        const i = +el.dataset.rm;
        const list2 = tileList().slice();
        list2.splice(i, 1);
        S.tiles = list2;
        save();
        redrawTiles();
        return;
      }
      if (q("#scAdd")) {
        const url = prompt("Shortcut URL");
        if (!url) return;
        const full = url.includes("://") ? url : "https://" + url;
        const name = prompt("Name", prettyHost(full)) || prettyHost(full);
        const list2 = tileList().slice();
        list2.push({ name, url: full });
        S.tiles = list2;
        save();
        redrawTiles();
        return;
      }
      if (el = q("[data-open]")) go(el.dataset.open);
    });
    page.addEventListener("input", (e) => {
      if (games.input(e)) return;
      ai.input(e);
    });
    page.addEventListener("keydown", (e) => {
      ai.keydown(e);
    });
    page.addEventListener("focusout", (e) => {
      ai.focusout(e);
    });
    page.addEventListener("paste", (e) => {
      ai.paste(e);
    });
    page.addEventListener("submit", (e) => {
      if (ai.submit(e)) return;
      e.preventDefault();
      if (e.target.id === "ntpForm") {
        const v = e.target.querySelector("input").value;
        if (v.trim()) go(v);
      }
    });
    page.addEventListener("change", (e) => {
      if (ai.change(e)) return;
      if (e.target.id === "panicUrl") {
        S.panicUrl = e.target.value.trim() || "https://google.com";
        save();
      }
      if (e.target.id === "ckTitle") {
        S.cloakTitle = e.target.value;
        save();
        applyTitle();
      }
      if (e.target.id === "ckIcon") {
        S.cloakIcon = e.target.value.trim();
        save();
        applyTitle();
        renderSetBody();
      }
    });
    page.addEventListener("dragstart", (e) => {
      const t = e.target.closest("[data-i]");
      if (t) dragI = +t.dataset.i;
      else e.preventDefault();
    });
    page.addEventListener("dragover", (e) => {
      if (dragI >= 0) e.preventDefault();
    });
    page.addEventListener("drop", (e) => {
      const t = e.target.closest("[data-i]");
      if (dragI < 0 || !t) return;
      e.preventDefault();
      const to = +t.dataset.i;
      const list2 = tileList().slice();
      const [m] = list2.splice(dragI, 1);
      list2.splice(to, 0, m);
      S.tiles = list2;
      dragI = -1;
      save();
      redrawTiles();
    });
    window.addEventListener("message", (e) => {
      if (e.origin !== location.origin) return;
      const p = e.data && e.data.__vlPop;
      if (p) {
        const t2 = tabOfWin(e.source) || cur();
        if (S.popblock !== false && t2 && t2.el) openReal(t2, String(p), true);
        return;
      }
      const d = e.data;
      if (!d || d.type !== "vl-error") return;
      const t = tabs.find((x) => x.el && x.el.contentWindow === e.source);
      if (!t) return;
      const st = state(t);
      if (d.action === "retry") {
        t.retried = false;
        navFrame(t, { url: st.url, host: st.host, query: st.query, search: st.search }, false);
      } else if (d.action === "swap") {
        t.retried = d.engine === "alt";
        navFrame(t, { url: st.url, host: st.host, query: st.query, search: st.search, force: d.engine }, false);
      }
    });
    document.addEventListener("keydown", (e) => {
      if (waitKey) {
        e.preventDefault();
        const mod = ["Shift", "Control", "Alt", "Meta"].includes(e.key);
        if (!mod) {
          if (e.key !== "Escape") S.panicKey = e.key;
          waitKey = false;
          save();
          renderSetBody();
        }
        return;
      }
      const typing = e.target.closest && e.target.closest("input,textarea");
      if (e.altKey && !e.ctrlKey && e.key.toLowerCase() === "t") {
        e.preventDefault();
        newTab();
        return;
      }
      if (e.altKey && !e.ctrlKey && e.key.toLowerCase() === "w") {
        e.preventDefault();
        closeTab(active);
        return;
      }
      if (e.ctrlKey && e.key.toLowerCase() === "l") {
        e.preventDefault();
        omni.focus();
        return;
      }
      if (e.key === "Escape") {
        if (games.back() || ai.back()) {
          e.preventDefault();
          return;
        }
        pop.hidden = true;
        hideSug();
      }
      if (!typing && !e.altKey && !e.ctrlKey && !e.metaKey && e.key === S.panicKey) {
        e.preventDefault();
        try {
          (window.top || window).location.href = S.panicUrl;
        } catch {
          location.href = S.panicUrl;
        }
      }
    });
    document.addEventListener("visibilitychange", fxSync);
    apply();
    renderAll();
    fxSync();
    ensureScramjet().catch(() => {
    }).finally(() => {
      boot().catch(() => {
      });
    });
    try {
      const heal = sessionStorage.getItem("vlHealUrl");
      if (heal) {
        sessionStorage.removeItem("vlHealUrl");
        setTimeout(() => go(heal), 600);
      }
    } catch (e) {
    }
    setInterval(() => {
      if (S.popblock !== false && !document.hidden) {
        for (const t of tabs) if (t.el) sweepFrames(t);
      }
    }, 1e3);
    setInterval(() => {
      if (S.perf) {
        const now = Date.now();
        for (const t of tabs) {
          if (t.id === active || t.zz || !t.el || t.loading || state(t).kind !== "site") continue;
          if (!t.bgAt) t.bgAt = now;
          if (now - t.bgAt < 12e4) continue;
          let busy = false;
          try {
            busy = playing(t.el.contentWindow);
          } catch {
          }
          if (busy) t.bgAt = now;
          else sleepTab(t);
        }
      }
      if (document.hidden) return;
      for (const t of tabs) {
        if (t.loading || !t.el) continue;
        const st = state(t);
        if (st.kind !== "site") continue;
        const ft = frameTitle(t);
        if (ft && ft !== st.title) {
          st.title = ft;
          renderTabs();
        }
      }
    }, 2e3);
  }
});

var SHELL = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><symbol id="i-back" viewBox="0 0 24 24"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></symbol><symbol id="i-fwd" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></symbol><symbol id="i-reload" viewBox="0 0 24 24"><path fill="currentColor" d="M17.65 6.35A7.96 7.96 0 0 0 12 4a8 8 0 1 0 7.73 10h-2.08A6 6 0 1 1 12 6c1.66 0 3.14.69 4.22 1.78L13 11h7V4z"/></symbol><symbol id="i-stop" viewBox="0 0 24 24"><path d="M7 7l10 10M17 7 7 17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol><symbol id="i-home" viewBox="0 0 24 24"><path d="M4 10.5 12 4l8 6.5V20h-5.2v-5.6H9.2V20H4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></symbol><symbol id="i-plus" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"/></symbol><symbol id="i-x" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></symbol><symbol id="i-search" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14"/></symbol><symbol id="i-star" viewBox="0 0 24 24"><path fill="currentColor" d="m22 9.24-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28z"/></symbol><symbol id="i-lock" viewBox="0 0 24 24"><path fill="currentColor" d="M17.5 9H17V6.75a5 5 0 0 0-10 0V9h-.5A2.5 2.5 0 0 0 4 11.5v7A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 17.5 9m-5.5 8.4a1.9 1.9 0 1 1 0-3.8 1.9 1.9 0 0 1 0 3.8m3-8.4H9V6.75a3 3 0 0 1 6 0z"/></symbol><symbol id="i-tv" viewBox="0 0 24 24"><rect x="2.5" y="6.5" width="19" height="12.5" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="m8 2.8 4 3.2 4-3.2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol><symbol id="i-ai" viewBox="0 0 24 24"><path fill="currentColor" d="M11 2.2c.5 3.8 2.1 5.9 6.4 6.4-4.3.5-5.9 2.6-6.4 6.4-.5-3.8-2.1-5.9-6.4-6.4 4.3-.5 5.9-2.6 6.4-6.4z"/><path fill="currentColor" d="M18 13.5c.3 2 1.1 3.1 3.4 3.4-2.3.3-3.1 1.4-3.4 3.4-.3-2-1.1-3.1-3.4-3.4 2.3-.3 3.1-1.4 3.4-3.4z"/></symbol><symbol id="i-rblx" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M5.6 2.2 21.8 6.5 17.5 22.7 1.3 18.4Zm4.1 7 5.2 1.4-1.4 5.2-5.2-1.4z"/></symbol><symbol id="i-dice" viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8.6" cy="8.6" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="15.4" cy="15.4" r="1.5" fill="currentColor"/></symbol><symbol id="i-full" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M9 4H4v5M15 4h5v5M15 20h5v-5M9 20H4v-5"/></symbol><symbol id="i-clip" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M20 11.5 12.2 19.3a5 5 0 0 1-7.1-7.1l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7l-8.5 8.5a1.7 1.7 0 0 1-2.4-2.4L15.3 6.6"/></symbol><symbol id="i-mic" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol><symbol id="i-stopsq" viewBox="0 0 24 24"><rect x="6.5" y="6.5" width="11" height="11" rx="2.5" fill="currentColor"/></symbol><symbol id="i-speak" viewBox="0 0 24 24"><path fill="currentColor" d="M4 9v6h4l5 4V5L8 9zm11.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM13 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></symbol><symbol id="i-copy" viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" fill="none" stroke="currentColor" stroke-width="2"/></symbol><symbol id="i-pin" viewBox="0 0 24 24"><path fill="currentColor" d="M16 3v2l-1 1v5l3 3v2h-5v5l-1 1-1-1v-5H6v-2l3-3V6L8 5V3z"/></symbol><symbol id="i-game" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" d="M7.5 7h9a4.5 4.5 0 0 1 4.4 3.6l.9 4.6A3 3 0 0 1 18.9 19c-.9 0-1.7-.4-2.2-1.1L15.5 16h-7l-1.2 1.9c-.5.7-1.3 1.1-2.2 1.1a3 3 0 0 1-2.9-3.8l.9-4.6A4.5 4.5 0 0 1 7.5 7z"/><path d="M8 10.5v3M6.5 12h3M15.5 11.5h.01M17.5 13.5h.01" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol><symbol id="i-dots" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2" fill="currentColor"/><circle cx="12" cy="12" r="2" fill="currentColor"/><circle cx="19" cy="12" r="2" fill="currentColor"/></symbol><symbol id="i-gear" viewBox="0 0 24 24"><path fill="currentColor" d="M8.3 5.9a3.7 3.7 0 1 1 7.4 0a3.7 3.7 0 1 1 -7.4 0ZM13.6 8.9a3.7 3.7 0 1 1 7.4 0a3.7 3.7 0 1 1 -7.4 0ZM13.6 15a3.7 3.7 0 1 1 7.4 0a3.7 3.7 0 1 1 -7.4 0ZM8.3 18.1a3.7 3.7 0 1 1 7.4 0a3.7 3.7 0 1 1 -7.4 0ZM3 15.1a3.7 3.7 0 1 1 7.4 0a3.7 3.7 0 1 1 -7.4 0ZM3 8.9a3.7 3.7 0 1 1 7.4 0a3.7 3.7 0 1 1 -7.4 0ZM6.8 12a5.2 5.2 0 1 1 10.4 0a5.2 5.2 0 1 1 -10.4 0ZM9.4 12a2.6 2.6 0 1 0 5.2 0a2.6 2.6 0 1 0 -5.2 0Z"/></symbol><symbol id="i-chat" viewBox="0 0 24 24"><path d="M20 3.5H4A2.5 2.5 0 0 0 1.5 6v8A2.5 2.5 0 0 0 4 16.5h2.5v4l5-4H20a2.5 2.5 0 0 0 2.5-2.5V6A2.5 2.5 0 0 0 20 3.5Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="7.4" cy="10" r="1.35" fill="currentColor"/><circle cx="12" cy="10" r="1.35" fill="currentColor"/><circle cx="16.6" cy="10" r="1.35" fill="currentColor"/></symbol><symbol id="i-send" viewBox="0 0 24 24"><path fill="currentColor" d="M3.4 20.4 21.85 12 3.4 3.6 3.39 10.1 16.5 12 3.39 13.9z"/></symbol><symbol id="i-reply" viewBox="0 0 24 24"><path fill="currentColor" d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/></symbol><symbol id="i-smile" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm3.5-9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></symbol><symbol id="i-seen" viewBox="0 0 24 24"><path fill="currentColor" d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12zM.41 13.41 6 19l1.41-1.41L1.83 12z"/></symbol><symbol id="i-add" viewBox="0 0 24 24"><path fill="currentColor" d="M15 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></symbol><symbol id="i-crown" viewBox="0 0 24 24"><path fill="currentColor" d="M3 8.5 7.5 12 12 5l4.5 7L21 8.5 19 18H5zM5 19.5h14V21H5z"/></symbol><symbol id="i-mega" viewBox="0 0 24 24"><path fill="currentColor" d="M3 10v4a1 1 0 0 0 1 1h3l5 4V5L7 9H4a1 1 0 0 0-1 1zm13.5 2A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></symbol><symbol id="i-palette" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3a9 9 0 0 0 0 18c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01a1.49 1.49 0 0 1 1.12-2.49H16a5 5 0 0 0 5-5c0-4.42-4.03-8-9-8zm-5.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></symbol><symbol id="i-mask" viewBox="0 0 24 24"><path fill="currentColor" d="M12 7C6 7 2 9 2 12.5 2 16 4.5 18 7.5 18c2 0 3-1.5 4.5-1.5S14.5 18 16.5 18c3 0 5.5-2 5.5-5.5C22 9 18 7 12 7zm-4.5 7a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4zm9 0a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4z"/></symbol><symbol id="i-eye" viewBox="0 0 24 24"><path fill="currentColor" d="M12 5C6.5 5 2.7 9.2 1.5 12c1.2 2.8 5 7 10.5 7s9.3-4.2 10.5-7C21.3 9.2 17.5 5 12 5zm0 11.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/></symbol><symbol id="i-chev" viewBox="0 0 24 24"><path fill="currentColor" d="M9.3 6.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4l-4.6 4.6a1 1 0 1 1-1.4-1.4l3.9-3.9-3.9-3.9a1 1 0 0 1 0-1.4z"/></symbol><symbol id="i-user" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 7c-2.7 0-8 1.3-8 4v3h16v-3c0-2.7-5.3-4-8-4zm6 5H6v-1c.2-.7 3.3-2 6-2s5.8 1.3 6 2z"/></symbol><symbol id="i-shield" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5zm6 9c0 4-2.6 7.8-6 8.9C8.6 18.8 6 15 6 11V6.3l6-2.2 6 2.2z"/></symbol><symbol id="i-cal" viewBox="0 0 24 24"><path fill="currentColor" d="M7 2h2v2h6V2h2v2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2zm12 8H5v10h14zm0-2V6H5v2z"/></symbol><symbol id="i-out" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7v2H5v14h7v2zm11-4-1.4-1.4 2.6-2.6H9v-2h8.2l-2.6-2.6L16 7l5 5z"/></symbol><symbol id="i-img" viewBox="0 0 24 24"><path fill="currentColor" d="M19 5v14H5V5h14m0-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-4.86 8.86-3 3.87L9 13.14 6 17h12z"/></symbol><symbol id="i-imgoff" viewBox="0 0 24 24"><path fill="currentColor" d="M21 5v12.2l-2-2V5H8.8l-2-2H19a2 2 0 0 1 2 2zM2.8 2.8 1.4 4.2 3 5.8V19a2 2 0 0 0 2 2h13.2l1.6 1.6 1.4-1.4zM5 19V7.8l4.9 4.9L7 16h8.2l3 3z"/></symbol><symbol id="i-undo" viewBox="0 0 24 24"><path fill="currentColor" d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62A8 8 0 0 1 20.34 16l2.37-.78A10.5 10.5 0 0 0 12.5 8z"/></symbol><symbol id="i-clock" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7z"/></symbol><symbol id="i-upload" viewBox="0 0 24 24"><path fill="currentColor" d="M5 20h14v-2H5zm0-10h4v6h6v-6h4l-7-7z"/></symbol><symbol id="i-zoomin" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.8l-.3-.3A6.5 6.5 0 1 0 9.5 16a6.5 6.5 0 0 0 4.2-1.6l.3.3v.8l5 5 1.5-1.5zm-6 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zM12 10h-2v2H9v-2H7V9h2V7h1v2h2z"/></symbol><symbol id="i-zoomout" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.8l-.3-.3A6.5 6.5 0 1 0 9.5 16a6.5 6.5 0 0 0 4.2-1.6l.3.3v.8l5 5 1.5-1.5zm-6 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zM7 9h5v1H7z"/></symbol><symbol id="i-trash" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5-1-1h-5l-1 1H5v2h14V4z"/></symbol><symbol id="i-poll" viewBox="0 0 24 24"><path fill="currentColor" d="M4 21V10h3v11zm6.5 0V3h3v18zM17 21v-7h3v7z"/></symbol><symbol id="i-gift" viewBox="0 0 24 24"><path fill="currentColor" d="M20 7h-2.2A3 3 0 0 0 12 3.8 3 3 0 0 0 6.2 7H4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm-5-2a1 1 0 1 1 0 2h-2a2 2 0 0 1 2-2zM9 5a2 2 0 0 1 2 2H9a1 1 0 0 1 0-2zM5 9h6v2H5zm1 4h5v6H6zm7 6v-6h5v6zm0-8V9h6v2z"/></symbol><symbol id="i-bell" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22zm6.5-6V11a6.5 6.5 0 0 0-5-6.32V4a1.5 1.5 0 0 0-3 0v.68A6.5 6.5 0 0 0 5.5 11v5L4 17.5V19h16v-1.5zm-2 1H7.5v-6a4.5 4.5 0 0 1 9 0z"/></symbol><symbol id="i-users" viewBox="0 0 24 24"><path fill="currentColor" d="M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 7c-2.7 0-8 1.3-8 4v3h16v-3c0-2.7-5.3-4-8-4zm6 5H3v-1c.2-.7 3.3-2 6-2s5.8 1.3 6 2zm1.1-11.9A4 4 0 0 1 16 11.9a4 4 0 0 0 0-7.8zM17.8 13.2A4.3 4.3 0 0 1 20 17v3h3v-3c0-2-2.8-3.4-5.2-3.8z"/></symbol><symbol id="i-block" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM4 12a8 8 0 0 1 12.9-6.3L5.7 16.9A8 8 0 0 1 4 12zm8 8a8 8 0 0 1-4.9-1.7L18.3 7.1A8 8 0 0 1 12 20z"/></symbol><symbol id="i-pen" viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.25V21h3.75L17.8 9.94l-3.75-3.75zM20.7 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"/></symbol><symbol id="i-swap" viewBox="0 0 24 24"><path fill="currentColor" d="M16 3l4 4-4 4V8H9V6h7zM8 13v3h7v2H8v3l-4-4z"/></symbol><symbol id="i-play" viewBox="0 0 24 24"><path fill="currentColor" d="M8 5.14v13.72a1 1 0 0 0 1.53.85l10.8-6.86a1 1 0 0 0 0-1.7L9.53 4.29A1 1 0 0 0 8 5.14z"/></symbol><symbol id="i-pause" viewBox="0 0 24 24"><path fill="currentColor" d="M7 4h3.5v16H7zm6.5 0H17v16h-3.5z"/></symbol><symbol id="i-mail" viewBox="0 0 24 24"><path fill="currentColor" d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1.6 2L12 12.2 19.4 7zM20 17V8.9l-7.4 5.2a1 1 0 0 1-1.2 0L4 8.9V17z"/></symbol><symbol id="i-note" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3z"/></symbol><symbol id="i-eyeoff" viewBox="0 0 24 24"><path fill="currentColor" d="M2.8 4.2 4.2 2.8l17 17-1.4 1.4-3.2-3.2A11 11 0 0 1 12 19C6.5 19 2.7 14.8 1.5 12a13 13 0 0 1 3.9-4.9zM12 5c5.5 0 9.3 4.2 10.5 7a13 13 0 0 1-2.8 3.9l-3.3-3.3A4.5 4.5 0 0 0 11.4 7.6L9.2 5.4A11 11 0 0 1 12 5zm-4.4 5 6.4 6.4A4.5 4.5 0 0 1 7.6 10z"/></symbol><symbol id="bow" viewBox="0 0 64 40"><path d="M32 18C24 6 8 1 4 8s3 20 28 10zM32 18c8-12 24-17 28-10s-3 20-28 10z" fill="#f4a6c0" stroke="#c2436f" stroke-width="1.8" stroke-linejoin="round"/><path d="M28 19 20 37l7-3 3 4 2-19zM36 19l8 18-7-3-3 4-2-19z" fill="#e9829f" stroke="#c2436f" stroke-width="1.8" stroke-linejoin="round"/><circle cx="32" cy="18" r="5" fill="#d85a86" stroke="#c2436f" stroke-width="1.8"/></symbol><symbol id="i-spark" viewBox="0 0 24 24"><path d="M12 1.5c.8 5.6 3.1 8.4 10.5 10.5-7.4 2.1-9.7 4.9-10.5 10.5C11.2 16.9 8.9 14.1 1.5 12 8.9 9.9 11.2 7.1 12 1.5z" fill="currentColor"/></symbol><symbol id="i-mark" viewBox="0 0 24 24"><path d="M10 2c.7 5 2.7 7.4 9 9.3-6.3 1.8-8.3 4.3-9 9.3-.7-5-2.7-7.5-9-9.3C7.3 9.4 9.3 7 10 2z" fill="currentColor"/><path d="M19.5 14.2c.3 2.1 1.1 3.1 3.5 3.8-2.4.7-3.2 1.7-3.5 3.8-.3-2.1-1.1-3.1-3.5-3.8 2.4-.7 3.2-1.7 3.5-3.8z" fill="currentColor"/></symbol><symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 20.5s-7.6-4.5-9.4-9.1C1.3 8.2 3.4 4.8 6.9 4.8c2 0 3.4 1.1 5.1 3 1.7-1.9 3.1-3 5.1-3 3.5 0 5.6 3.4 4.3 6.6-1.8 4.6-9.4 9.1-9.4 9.1z" fill="currentColor"/></symbol><symbol id="i-moon" viewBox="0 0 24 24"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" fill="currentColor"/></symbol><symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></symbol><symbol id="g-yt" viewBox="0 0 24 24"><path fill-rule="evenodd" fill="currentColor" d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3z"/></symbol><symbol id="g-dc" viewBox="0 0 24 24"><path fill-rule="evenodd" fill="currentColor" d="M19.3 5.4A16.4 16.4 0 0 0 15.2 4l-.5 1a15.3 15.3 0 0 0-5.4 0l-.5-1a16.4 16.4 0 0 0-4.1 1.4C2.1 9.3 1.4 13.1 1.7 16.8a16.6 16.6 0 0 0 5 2.5l1.1-1.7c-.6-.2-1.2-.5-1.7-.8l.4-.3a11.8 11.8 0 0 0 11 0l.4.3c-.5.3-1.1.6-1.7.8l1.1 1.7a16.6 16.6 0 0 0 5-2.5c.4-4.3-.6-8-3-11.4zM8.7 14.6c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm6.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z"/></symbol><symbol id="g-tt" viewBox="0 0 24 24"><path fill="currentColor" d="M16.6 2h-3.3v13.2a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9a6.3 6.3 0 1 0 5.3 6.2V8.6a8 8 0 0 0 4.6 1.5V6.8A4.6 4.6 0 0 1 16.6 2z"/></symbol><symbol id="g-tw" viewBox="0 0 24 24"><path fill-rule="evenodd" fill="currentColor" d="M4 2 2.5 5.5v14H7V22h2.5l2.5-2.5h3.7L21.5 14V2zm15.5 11-3 3h-4.1l-2.6 2.6V16H6.5V4h13zM15 7h2v5h-2zm-5 0h2v5h-2z"/></symbol><symbol id="g-sc" viewBox="0 0 24 24"><path fill="currentColor" d="M11 8.3v9.2h7.6a3.4 3.4 0 0 0 .3-6.8A5 5 0 0 0 11 8.3zM9 9.5h1.2v8H9zM7 11h1.2v6.5H7zm-2 1h1.2v5.5H5zm-2 1.5h1.2v4H3z"/></symbol><symbol id="g-sn" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.5c3 0 5.3 2.3 5.3 5.5v2.3l1.6-.5c.5 0 .8.3.8.6 0 .5-.6.8-1.8 1.2.5 1.6 1.8 3 3.6 3.6-.2.8-1.3 1.1-2.7 1.3l-.3 1.2c-1-.1-2-.2-3 .3-.9.5-1.8 1.5-3.5 1.5s-2.6-1-3.5-1.5c-1-.5-2-.4-3-.3l-.3-1.2c-1.4-.2-2.5-.5-2.7-1.3 1.8-.6 3.1-2 3.6-3.6-1.2-.4-1.8-.7-1.8-1.2 0-.3.3-.6.8-.6l1.6.5V8c0-3.2 2.3-5.5 5.3-5.5z"/></symbol><symbol id="g-ig" viewBox="0 0 24 24"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" fill="none" stroke="currentColor" stroke-width="2.1"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2.1"/><circle cx="17.2" cy="6.8" r="1.3" fill="currentColor"/></symbol><symbol id="g-pin" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.5 1.8-2.5.9 0 1.3.7 1.3 1.5 0 .9-.6 2.2-.9 3.4-.2 1 .5 1.9 1.6 1.9 1.9 0 3.3-2 3.3-4.9 0-2.6-1.8-4.4-4.5-4.4-3 0-4.8 2.3-4.8 4.6 0 .9.4 1.9.8 2.4l.1.4-.3 1.2c0 .2-.2.3-.4.2-1.3-.6-2.2-2.6-2.2-4.2 0-3.4 2.5-6.6 7.2-6.6 3.8 0 6.7 2.7 6.7 6.3 0 3.7-2.4 6.8-5.6 6.8-1.1 0-2.2-.6-2.5-1.3l-.7 2.6c-.3 1-.9 2.1-1.4 2.9A10 10 0 1 0 12 2z"/></symbol><symbol id="g-rb" viewBox="0 0 24 24"><path fill-rule="evenodd" fill="currentColor" d="M6.3 2 2 17.7 17.7 22 22 6.3zm7.1 12.5-4-1.1 1.1-4 4 1.1z"/></symbol></defs></svg><div class="vl" id="vl" data-theme="lit" data-led="violet" data-bar="compact"><div class="amb"><div class="a-lit"></div><div class="a-star"><div class="shoot"></div><svg class="moon"><use href="#i-moon"/></svg></div><div class="a-pearl"></div><div class="a-jelly"></div><div class="a-coq"></div><canvas id="fx"></canvas></div><header class="chrome"><div class="tabs" id="tabs" role="tablist" aria-label="Tabs"></div><div class="bar"><button class="btn cbar" id="bLogo" aria-label="Home"><svg class="ic"><use href="#i-mark"/></svg></button><button class="btn" id="bBack" aria-label="Back"><svg class="ic"><use href="#i-back"/></svg></button><button class="btn opt" id="bFwd" aria-label="Forward"><svg class="ic"><use href="#i-fwd"/></svg></button><button class="btn" id="bReload" aria-label="Reload"><svg class="ic"><use href="#i-reload"/></svg></button><form class="omni" id="omniForm" autocomplete="off"><i class="beam" aria-hidden="true"></i><button type="button" class="sbtn" id="siteBtn" aria-label="Site info"><svg class="ic"><use href="#i-search"/></svg></button><input id="omni" placeholder="Search or type a URL" spellcheck="false" aria-label="Address bar"><button type="button" class="sbtn" id="bStar" aria-label="Bookmark"><svg class="ic"><use href="#i-star"/></svg></button><button type="button" class="sbtn oclose" id="bClose" aria-label="Close tab"><svg class="ic"><use href="#i-x"/></svg></button></form><button class="btn cbar" id="bNew" aria-label="New tab"><svg class="ic"><use href="#i-plus"/></svg></button><button class="btn" id="bWatch" aria-label="Watch"><svg class="ic"><use href="#i-tv"/></svg></button><button class="btn" id="bAI" aria-label="AI"><svg class="ic"><use href="#i-ai"/></svg></button><button class="btn" id="bRblx" aria-label="Roblox"><svg class="ic"><use href="#i-rblx"/></svg></button><button class="btn" id="bChat" aria-label="Chat"><svg class="ic"><use href="#i-chat"/></svg><span class="pip" id="pip" hidden></span></button><button class="btn" id="bGear" aria-label="Settings"><svg class="ic"><use href="#i-gear"/></svg></button><button class="btn mmore" id="bMore" aria-label="More" aria-haspopup="menu"><svg class="ic"><use href="#i-dots"/></svg></button></div><div class="led"><i></i></div></header><main class="view" id="view"></main><div class="sug" id="sug" hidden></div><div class="toast" id="toast" role="status" hidden><svg class="ic spin"><use href="#i-spark"/></svg><span></span></div><div class="pop" id="pop" hidden></div><div class="mmenu" id="mmenu" role="menu" hidden></div></div>`;

document.getElementById("root").innerHTML = SHELL;
try {
  const v = document.getElementById("vl"), s = JSON.parse(localStorage.getItem("vella") || "{}");
  if (s.theme) v.dataset.theme = s.theme === "gum" ? "pearl" : s.theme;
  if (s.led) v.dataset.led = s.led;
  v.dataset.bar = (s.barV2 ? s.bar || "Compact" : "Compact").toLowerCase();
  if (s.lights === false) v.classList.add("nolights");
  if (s.glitter === "Off") v.classList.add("noglit");
} catch {
}
var load2 = (src) => new Promise((ok, no) => {
  const s = document.createElement("script");
  s.src = src;
  s.onload = ok;
  s.onerror = no;
  document.head.appendChild(s);
});
for (const src of [__vkb+"assets/core.js", __vkb+"assets/cfg.js", __vkb+"assets/rw.js"]) await load2(src);
await Promise.resolve().then(() => (init_app(), app_exports));