import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useContentFreshness } from '@/hooks/useContentFreshness';
import { formatDistanceToNow } from 'date-fns';

export const ContentFreshnessWidget = () => {
  const { freshness, loading, markAsReviewed } = useContentFreshness();

  const getScoreBadgeVariant = (score: number): "default" | "destructive" | "outline" | "secondary" => {
    if (score >= 80) return 'default';
    if (score >= 50) return 'secondary';
    return 'destructive';
  };

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Content Freshness
          </CardTitle>
          <CardDescription>
            Posts that may need updating
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {loading && freshness.length === 0 ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded" />
            ))}
          </div>
        ) : freshness.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-600" />
            <p>All content is fresh!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {freshness.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-4 p-3 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Link
                      to={`/admin/blog/edit/${item.post_id}`}
                      className="font-medium hover:underline truncate"
                    >
                      {item.post?.title}
                    </Link>
                    <Badge variant={getScoreBadgeVariant(item.freshness_score)}>
                      {item.freshness_score}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Last updated: {item.post?.updated_at ? formatDistanceToNow(new Date(item.post.updated_at), { addSuffix: true }) : 'Unknown'}
                  </p>
                  {item.update_suggestions && item.update_suggestions.length > 0 && (
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {item.update_suggestions.slice(0, 2).map((suggestion, idx) => (
                        <li key={idx}>• {suggestion}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => markAsReviewed(item.post_id)}
                >
                  <CheckCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {freshness.length > 5 && (
              <p className="text-sm text-muted-foreground text-center">
                +{freshness.length - 5} more posts need attention
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
