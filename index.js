export default {
  async fetch(request) {
    const url = new URL(request.url)

    if (url.pathname === "/") {
      return new Response(
        `        <h1>Cloudflare Worker API - Marko</h1>        <p>Uporabi naslednje poti:</p>        <ul>          <li><a href="/api/time">/api/time</a></li>          <li><a href="/api/hello?name=Marko">/api/hello?name=Marko</a></li>          <li><a href="/api/quote">/api/quote</a></li>          <li><a href="/api/student">/api/student</a></li>        </ul>        `,
        { headers: { "content-type": "text/html; charset=utf-8" } }
      )
    }

    if (url.pathname === "/api/time") {
      return Response.json({
        time: new Date().toISOString()
      })
    }

    if (url.pathname === "/api/hello") {
      const name = url.searchParams.get("name") || "guest"
      return Response.json({
        message: `Živijo ${name}, uspešno si spremenil pozdrav!`
      })
    }

    if (url.pathname === "/api/student") {
      return Response.json({
        ime: "Marko",
        priimek: "Vosner",
        status: "Informatik - VSS Velenje",
        sprememba: "Dodana nova API pot za študenta"
      })
    }

    if (url.pathname === "/api/quote") {
      try {
        const res = await fetch("https://zenquotes.io/api/random")
        const data = await res.json()

        return Response.json({
          quote: data[0].q,
          author: data[0].a
        })
      } catch (e) {
        return Response.json(
          { error: "Quote API error" },
          { status: 500 }
        )
      }
    }

    return new Response("Not found", { status: 404 })
  }
}