// Security audit logging utility
interface AuditLogEntry {
  action: string;
  resource: string;
  resourceId?: string;
  userId?: string;
  userEmail?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

class AuditLogger {
  private logQueue: AuditLogEntry[] = [];
  
  // Log security-sensitive actions
  log(entry: Omit<AuditLogEntry, 'timestamp'>) {
    const logEntry: AuditLogEntry = {
      ...entry,
      timestamp: new Date().toISOString(),
    };
    
    // Log to console for now (in production, send to monitoring service)
    console.log('[AUDIT]', JSON.stringify(logEntry));
    
    // Store in queue for potential batch sending
    this.logQueue.push(logEntry);
    
    // Keep only last 100 entries in memory
    if (this.logQueue.length > 100) {
      this.logQueue = this.logQueue.slice(-100);
    }
  }
  
  // Specific logging methods for common actions
  logBlogAction(action: string, postId?: string, userId?: string, userEmail?: string, metadata?: Record<string, any>) {
    this.log({
      action: `blog_${action}`,
      resource: 'blog_post',
      resourceId: postId,
      userId,
      userEmail,
      metadata,
    });
  }
  
  logNewsletterAction(action: string, email?: string, metadata?: Record<string, any>) {
    this.log({
      action: `newsletter_${action}`,
      resource: 'newsletter_subscription',
      resourceId: email,
      metadata,
    });
  }
  
  logAuthAction(action: string, userId?: string, userEmail?: string, metadata?: Record<string, any>) {
    this.log({
      action: `auth_${action}`,
      resource: 'authentication',
      resourceId: userId,
      userId,
      userEmail,
      metadata,
    });
  }
  
  // Get recent logs (for debugging)
  getRecentLogs(limit: number = 10): AuditLogEntry[] {
    return this.logQueue.slice(-limit);
  }
}

export const auditLogger = new AuditLogger();
