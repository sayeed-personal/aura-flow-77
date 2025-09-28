import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Heart } from "lucide-react";
import { useState } from "react";

interface Quote {
  text: string;
  source: string;
  arabic?: string;
}

const MotivationalQuote = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  
  const quotes: Quote[] = [
    {
      text: "And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.",
      source: "Quran 65:3",
      arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ ۚ إِنَّ اللَّهَ بَالِغُ أَمْرِهِ"
    },
    {
      text: "The believer who mixes with people and bears their annoyance with patience will have a greater reward than the believer who does not mix with people.",
      source: "Hadith - Ibn Majah",
    },
    {
      text: "And it is He who created the heavens and earth in truth. And the day He says, 'Be,' and it is, His word is the truth.",
      source: "Quran 6:73",
      arabic: "وَهُوَ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ بِالْحَقِّ"
    }
  ];

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  const quote = quotes[currentQuote];

  return (
    <Card className="bg-gradient-peaceful shadow-soft border-0 animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">📖</span>
            <h3 className="font-semibold text-foreground">Daily Inspiration</h3>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={nextQuote}
              className="hover:bg-muted"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            
            <Button variant="ghost" size="icon" className="hover:bg-muted">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Arabic Text (if available) */}
        {quote.arabic && (
          <div className="mb-4 p-4 bg-muted/30 rounded-lg text-right">
            <p className="text-xl leading-relaxed font-arabic text-foreground">
              {quote.arabic}
            </p>
          </div>
        )}

        {/* English Translation */}
        <blockquote className="text-lg leading-relaxed text-foreground mb-4 italic">
          "{quote.text}"
        </blockquote>

        {/* Source */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-primary">
            — {quote.source}
          </p>
          
          <div className="flex space-x-1">
            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuote(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentQuote ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotivationalQuote;