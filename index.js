JavaScript
export default {
  async fetch(request) {
    const url = new URL(request.url)

    if (url.pathname === "/") {
      return new Response(
        `        <h1>Cloudflare Worker API - Marko</h1>        <p>Uporabi naslednje poti:</p>        <ul>          <li>/api/time</li>          <li>/api/hello?name=Marko</li>          <li>/api/quote</li>          <li>/api/student</li>        </ul>        `,
        { headers: { "content-type": "text/html" } }
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
        message: `Zivijo ${name}, uspesno si spremenil pozdrav!`
      })
    }

    if (url.pathname === "/api/student") {
      return Response.json({
        ime: "Marko",
        priimek: "Vosner",
        status: "Informatik - Velenje"
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