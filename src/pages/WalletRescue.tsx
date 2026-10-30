import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ShieldAlert, KeyRound, Ban, Clock, Mail } from "lucide-react";
import { updateMetaTags } from "@/utils/seoUtils";

const CONTACT = "mailto:brad@unitedpress.media?subject=Wallet%20rescue%20introduction";

const WalletRescue = () => {
  useEffect(() => {
    updateMetaTags({
      title: "Compromised Wallet Rescue Introductions | White-Hat Specialists | UPM",
      description: "Keys leaked but funds not yet drained? UPM introduces you to vetted white-hat recovery specialists who can secure the assets still in your compromised wallet. Introductions only.",
      keywords: "compromised wallet, wallet rescue, white hat crypto recovery, leaked private key, revoke approvals, secure crypto assets, wallet drainer",
      ogTitle: "Compromised Wallet? Get an Introduction to White-Hat Rescue Specialists",
      ogDescription: "If your keys are exposed but your funds are still in the wallet, speed matters. We connect you with white-hat specialists.",
    });
  }, []);

  const helps = [
    "Move remaining tokens, NFTs and staked positions out before they are swept",
    "Revoke malicious token approvals and permissions",
    "Secure assets even while sweeper bots are watching the wallet",
    "Set up a clean wallet and a safer signing routine afterwards",
  ];

  const notFor = [
    "Funds that have already been transferred out of the wallet",
    "Wallets where you no longer hold the private key or seed phrase",
    "Anyone promising guaranteed recovery of stolen funds. No honest specialist does.",
  ];

  const steps = [
    { title: "Contact us", text: "Tell us what happened, which chain, and that you still hold the key and the funds are still there." },
    { title: "We introduce you", text: "We put you in touch with a white-hat specialist suited to your chain and situation. We make the introduction only; we do not handle your keys or funds." },
    { title: "You agree terms directly", text: "Fees and scope are agreed between you and the specialist. Never share your seed phrase or private key with anyone before you understand exactly what they will do." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              <ShieldAlert className="h-4 w-4" /> Time-sensitive
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Compromised Wallet? Your Funds May Still Be Saveable.</h1>
            <p className="text-lg text-muted-foreground mb-8">
              If your keys were leaked or you signed a malicious approval but your assets have not been drained yet, speed matters. We introduce you to trusted white-hat recovery specialists who can secure what is still there.
            </p>
            <Button size="lg" asChild>
              <a href={CONTACT}><Mail className="h-4 w-4 mr-2" />Request an introduction</a>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">brad@unitedpress.media</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-2 gap-8">
            <Card className="border-primary/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><KeyRound className="h-5 w-5 text-primary" />What specialists can help with</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {helps.map((h) => (
                    <li key={h} className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" /><span className="text-sm">{h}</span></li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Ban className="h-5 w-5 text-destructive" />What this is not</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {notFor.map((n) => (
                    <li key={n} className="flex items-start gap-2"><Ban className="h-4 w-4 text-destructive mt-1 flex-shrink-0" /><span className="text-sm">{n}</span></li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-10">How it works</h2>
            <div className="space-y-6">
              {steps.map((s, i) => (
                <Card key={s.title} className="border-l-4 border-l-primary">
                  <CardHeader>
                    <CardTitle className="text-xl">{i + 1}. {s.title}</CardTitle>
                    <CardDescription className="text-base">{s.text}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <div className="flex items-center justify-center gap-2 text-primary font-semibold mb-3"><Clock className="h-5 w-5" />Until you have spoken to a specialist</div>
            <p className="text-muted-foreground mb-8">
              Do not send new funds to the compromised wallet, not even for gas. Sweeper bots can drain a deposit within seconds.
            </p>
            <Button size="lg" asChild><a href={CONTACT}>Contact our team</a></Button>
            <p className="text-xs text-muted-foreground mt-8">
              UPM provides introductions only and is not a recovery service. Outcomes depend on the state of the wallet and the chain, and are never guaranteed. Not financial or legal advice.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WalletRescue;
